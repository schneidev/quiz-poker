<script>
	import { fade } from "svelte/transition";
	import { P, Card, Badge, Heading, Span, GradientButton, Progressbar } from "flowbite-svelte";
	import CategoryPicker from "../components/CategoryPicker.svelte";
	import Sidebar from "../components/Sidebar.svelte";
	import Phase from "../components/Phase.svelte";
	import Rules from "../components/Rules.svelte";
	import { get } from "svelte/store";
	import { areas } from "$lib/state";
	import { GithubSolid } from "flowbite-svelte-icons";

	const PHASE = {
		START: 0,
		QUESTION: 1,
		HINT_1: 2,
		HINT_2: 3,
		HINT_3: 4,
		ANSWER: 5
	};

	let phase = $state(PHASE.START);
	let progress = $state(0);
	let loading = $state(false);
	let interval;
	const MAX_TIME = 5000;

	let area = $state("");
	let question = $state("");
	let answer = $state("");
	let hints = $state([]);

	async function sendMessage() {
		if (phase === PHASE.START || phase === PHASE.ANSWER) {
			interval = startProgress();
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ areas: $areas })
			});

			({ area, question, answer, hints } = await res.json());

			loading = false;
			progress = 0;
			clearInterval(interval);
		}

		phase += 1;
		if (phase > PHASE.ANSWER) {
			phase = PHASE.QUESTION;
		}
	}

	function startProgress() {
		loading = true;
		const interval = setInterval(() => {
			if (progress < 100) {
				progress += 1;
			} else {
				clearInterval(interval);
			}
		}, 60);

		return interval;
	}
</script>

<div class="mx-auto flex w-full flex-col items-center overflow-hidden p-4 sm:w-3/4">
	<Heading tag="h1" class="text-4xl md:text-8xl">
		<Span gradient="pinkToOrange">Quiz Poker</Span>
	</Heading>

	{#if phase === PHASE.START}
		<Rules />
	{:else}
		<Phase {phase} />
		<div transition:fade class="mt-4 w-full flex-1 overflow-hidden pt-4">
			<Card class="relative max-w-full p-8">
				{#if area !== ""}
					<Badge class="absolute -top-4 left-4 bg-orange-200 text-lg text-pink-500 md:text-2xl"
						><strong>{area.name}</strong></Badge
					>
				{/if}
				<Heading tag="h2" class="text-center text-lg md:text-4xl">{question}</Heading>
			</Card>

			<div class="mt-4 grid grid-cols-1 gap-2 md:mt-8 md:grid-cols-3">
				{#each hints.slice(0, phase - 1) as hint, i}
					<div class="h-full w-full">
						<Card class="h-full min-w-full p-4">
							<Heading tag="h5" class="text-base md:text-xl">
								Tipp {i + 1}
							</Heading>
							<P class="text-sm md:text-lg">{hint}</P>
						</Card>
					</div>
				{/each}
			</div>

			{#if phase === PHASE.ANSWER}
				<Heading tag="h2" class="mt-8 text-center text-2xl md:text-4xl">{answer}</Heading>
			{/if}
		</div>
	{/if}

	<GradientButton
		onclick={sendMessage}
		outline
		shadow
		color="pinkToOrange"
		class="fixed bottom-6 w-xl max-w-3/4 focus:outline-none"
	>
		<span class="text-2xl"
			>{phase === PHASE.START || phase === PHASE.ANSWER ? "Nächste Frage" : "Weiter"}</span
		>
	</GradientButton>

	{#if loading}
		<div class="fixed bottom-2 w-3/4">
			<Progressbar animate="true" color="red" {progress} />
		</div>
	{/if}
</div>

<Sidebar />
<div class="fixed top-4 right-4 hidden md:block">
	<a href="https://github.com/schneidev/quiz-poker" target="_blank"
		><GithubSolid size="xl" class="fill-gray-400 hover:fill-gray-100" /></a
	>
</div>
