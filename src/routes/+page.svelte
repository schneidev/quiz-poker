<script>
    import { fade } from "svelte/transition";

	const PHASE = {
		QUESTION: 0,
		HINT_1: 1,
		HINT_2: 2,
		HINT_3: 3,
		ANSWER: 4
	};

	let phase = PHASE.ANSWER;
    let progress = 0;
	let loading = false;
	let interval;
	const MAX_TIME = 5000;

    let area = "";
	let question = 'Starte indem du auf "Nächste Frage" klickst.';
	let answer = '';
	let hints = [];

	async function sendMessage() {
		if (phase === PHASE.NEW_QUESTION || phase === PHASE.ANSWER) {
			startProgress();
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({})
			});

			const data = await res.json();
			console.log(data);

            area = data.area;
			question = data.question;
			answer = data.answer;
			hints = data.hints;

			stopProgress();
		}

		console.log(question);
		console.log(answer);
		console.log(hints);

		phase = (phase + 1) % Object.keys(PHASE).length;
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

<div class="mx-auto flex h-screen max-h-screen w-4/5 flex-col items-center p-4">
	<h1 class="mb-4 font-extrabold text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
		<span
			class="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-8xl text-transparent"
		>
			Quiz Poker
		</span>
	</h1>

	<div transition:fade class="mt-20 w-full flex-1 overflow-auto p-10">
        <span class="text-2xl font-semibold me-2 px-2.5 py-0.5 rounded-sm dark:bg-orange-200 dark:text-pink-500 ms-2">{area}</span>
		<p class="text-center text-4xl">{question}</p>

		<div class="mt-8 flex flex-row justify-center">
			{#each hints.slice(0, phase) as hint, i}
				<div
					class="m-4 block w-1/3 max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
				>
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						Tipp {i + 1}
					</h5>
					<p class="text-xl font-normal text-gray-700 dark:text-gray-400">{hint}</p>
				</div>
			{/each}
		</div>

		{#if phase === PHASE.ANSWER}
			<p class="mt-8 text-center text-4xl">{answer}</p>
		{/if}
	</div>

	<button
		on:click={sendMessage}
		class="group relative me-2 mt-10 mb-30 inline-flex w-xl cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-xl font-medium text-gray-900 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:ring-pink-200 focus:outline-none dark:text-white dark:focus:ring-pink-800"
	>
		<span
			class="relative w-xl rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-transparent dark:bg-gray-900 group-hover:dark:bg-transparent"
		>
			{phase != PHASE.ANSWER ? 'Weiter' : 'Nächste Frage'}
		</span>
	</button>

	{#if loading}
		<div transition:fade class="fixed bottom-4 mx-10 h-2 w-3/4 overflow-hidden rounded-full bg-gray-300">
			<div
				class="absolute top-0 bottom-0 left-0 rounded-full bg-gradient-to-r from-pink-500 to-orange-400"
				style="width: {progress}%"
			></div>
		</div>
	{/if}
</div>
