<script>
	import { fade } from 'svelte/transition';
	import { Badge } from 'flowbite-svelte';
	import CategoryPicker from '../components/CategoryPicker.svelte';
	import Sidebar from '../components/Sidebar.svelte';
	import Phase from '../components/Phase.svelte';
	import Rules from '../components/Rules.svelte';
	import { getAreas } from '$lib/state.svelte.js';
	import { get } from 'svelte/store';

	const PHASE = {
		START: 0,
		QUESTION: 1,
		HINT_1: 2,
		HINT_2: 3,
		HINT_3: 4,
		ANSWER: 5
	};

	let phase = PHASE.START;
	let progress = 0;
	let loading = false;
	let interval;
	const MAX_TIME = 5000;

	let area = '';
	let question = '';
	let answer = '';
	let hints = [];

	async function sendMessage() {
		if (phase === PHASE.START || phase === PHASE.ANSWER) {
			startProgress();
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ areas: getAreas() })
			});

			const data = await res.json();

			area = data.area;
			question = data.question;
			answer = data.answer;
			hints = data.hints;

			stopProgress();
		}

		phase += 1;
		if (phase > PHASE.ANSWER) {
			phase = PHASE.QUESTION;
		}
	}

	function startProgress() {
		progress = 0;
		loading = true;

		const intervalTime = 20; // update every 100ms
		const increment = 100 / (MAX_TIME / intervalTime); // % per tick

		interval = setInterval(() => {
			if (progress < 100) {
				progress += increment;
			} else {
				clearInterval(interval);
			}
		}, intervalTime);
	}

	function stopProgress() {
		clearInterval(interval);
		progress = 100;
		setTimeout(() => {
			loading = false;
			progress = 0;
		}, 500); // small delay to show completion
	}
</script>

<div class="mx-auto flex w-full flex-col items-center p-4 md:w-3/4">
	<h1 class="mb-4 font-extrabold text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
		<span
			class="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-8xl text-transparent"
		>
			Quiz Poker
		</span>
	</h1>

	<Phase {phase} />
	{#if phase === PHASE.START}
		<Rules />
	{:else}
		<div transition:fade class="mt-4 w-full flex-1 overflow-auto p-10">
			<div
				class="relative mx-auto block w-full rounded-lg border border-gray-200 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				{#if area !== ''}
					<Badge class="absolute -top-4 left-4 text-2xl bg-orange-200 text-pink-500">{ area.name }</Badge>
				{/if}
				<h5
					class="mt-2 mb-2 text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
				>
					{question}
				</h5>
			</div>

			<div class="mt-8 flex flex-row justify-center md:mt-0">
				{#each hints.slice(0, phase - 1) as hint, i}
					<div
						class="m-4 block w-1/3 max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
					>
						<h5
							class="mb-2 text-xl font-bold tracking-tight text-gray-900 xl:text-2xl dark:text-white"
						>
							Tipp {i + 1}
						</h5>
						<p class="text-base font-normal text-gray-700 xl:text-xl dark:text-gray-400">{hint}</p>
					</div>
				{/each}
			</div>

			{#if phase === PHASE.ANSWER}
				<p class="mt-8 text-center text-4xl md:mt-2">{answer}</p>
			{/if}
		</div>
	{/if}

	<button
		on:click={sendMessage}
		class="group fixed bottom-6 me-2 inline-flex w-xl cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-xl font-medium text-gray-900 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:ring-pink-200 focus:outline-none dark:text-white dark:focus:ring-pink-800"
	>
		<span
			class="relative w-xl rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-transparent dark:bg-gray-900 group-hover:dark:bg-transparent"
		>
			{phase === PHASE.START || phase === PHASE.ANSWER ? 'Nächste Frage' : 'Weiter'}
		</span>
	</button>

	{#if loading}
		<div
			transition:fade
			class="fixed bottom-2 mx-10 h-2 w-3/4 overflow-hidden rounded-full bg-gray-300"
		>
			<div
				class="absolute top-0 bottom-0 left-0 rounded-full bg-gradient-to-r from-pink-500 to-orange-400"
				style="width: {progress}%"
			></div>
		</div>
	{/if}
</div>

<Sidebar />
