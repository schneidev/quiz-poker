import { json } from '@sveltejs/kit';
import { getActivatedAreas } from "$lib/areas"
import { loadEntries, addEntry } from "$lib/entries"

export async function POST({ request }) {
	await request.json();

    const db_entries = await loadEntries()

    const areas = await getActivatedAreas();
    const area = areas[Math.floor(Math.random() * areas.length)]

	const prompt = `
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

Folgende Fragen wurden schon verwendet und sollen nicht noch einmal verwendet werden:
${db_entries}
`;

	const res = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			model: 'gpt-4o',
			messages: [
				{
					role: 'system',
					content:
						'Du bist ein Quizmaster in einer Gameshow. Deine Aufgabe ist es zufällig Fragen aus dem Allgemeinwissen zu stellen. Achte dabei auf ein Standardformat.',
					role: 'user',
					content: prompt
				}
			],
            response_format: {type: "json_object" },
            temperature: 0.7,
            seed: Math.floor(Math.random() * 1000000000)
		})
	});

	const data = await res.json();
	let reply = data.choices?.[0]?.message?.content || 'No response';
    reply = JSON.parse(reply);

    if (reply !== 'No response') {
        addEntry(reply.question)
        reply.area = area;
    }

	return json(reply);
}