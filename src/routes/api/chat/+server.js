import { json } from "@sveltejs/kit";
import prisma from "$lib/prisma";

async function loadQuestions() {
	const questions = await prisma.question.findMany();
	return { questions };
}

async function addQuestion(question) {
	await prisma.question.create({ data: { text: question } });
}

export async function POST({ request }) {
	const { areas } = await request.json();

	const filteredAreas = areas.filter((x) => x.activated);
	let area = { name: "Allgemeinwissen", activated: true };
	if (filteredAreas.length > 0) {
		area = filteredAreas[Math.floor(Math.random() * filteredAreas.length)];
	}

	let questions = (await loadQuestions()).questions;
	questions = questions.map((q) => q.text).join("\n");

	const prompt = `
Du bist ein Quizmaster in einer Gameshow. Deine Aufgabe ist es zufällig Fragen aus dem Allgemeinwissen zu stellen. Achte dabei auf ein Standardformat.
Du bist ein Quiz-Generator. Erstelle eine einzige Quizfrage aus dem Bereich ${area.name} die eine Schätzfrage ist. 
Die Fragen sollen schon etwas spezieller und schwieriger sein. Du sollst eine Frage, die Antwort und 3 dazugehörige Tipps geben, 
dabei sollen die Tipps immer genauer zur Antwort hinführen, aber die Tipps sollen gezielt zur richtigen Antwort führen und keine
Tipps geben die nichts mit der Antwort zu tun haben. Die Tipps sollen sich nicht wiederholen 
oder schon bereits erhaltene Informationen aus der Frage oder anderen Tipps enthalten.
Die Fragen sollen aus den Gebieten kommen:

Gib die Ausgabe bitte im folgenden JSON-Format zurück:
{
  "question": "Wie viele Einwohner hat die Hauptstadt von Italien?",
  "answer": "2,76 Millionen",
  "hints": [
    "Die Hauptstadt ist Rom",
    "Rom hat eine Gesamtfläche von 1285 Quadratkilometer."
    "Im Jahr 2012 waren es knapp über 4 Millionen.",
  ]
}

Antworte bitte nur mit JSON ohne Erklärungen.
Folgende Fragen sollen auf keinen Fall erneut vorkommen:
${questions}
`;

	console.log(prompt);

	const res = await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			model: "gpt-4o",
			messages: [
				{
					role: "user",
					content: prompt
				}
			],
			response_format: { type: "json_object" },
			temperature: 0.7,
			seed: Math.floor(Math.random() * 1000000000)
		})
	});

	const data = await res.json();
	let reply = data.choices?.[0]?.message?.content || "No response";
	reply = JSON.parse(reply);

	if (reply !== "No response") {
		reply.area = area;
		await addQuestion(reply.question);
	}

	return json(reply);
}
