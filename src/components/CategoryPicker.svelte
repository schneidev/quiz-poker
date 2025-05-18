<script>
	import { onMount } from 'svelte';
	import { getAreas } from '$lib/state.svelte.js';

	let areas = $state([]);

	onMount(async () => {
		areas = getAreas();
	});
</script>

<div class="flex w-full flex-row flex-wrap justify-evenly">
	{#each areas as area, index}
		<div class="mb-4 flex w-1/2">
			<input
				type="checkbox"
				id={`area-${index}`}
				bind:checked={area.activated}
				class="peer hidden"
			/>
			<label
				for={`area-${index}`}
				class="mr-1 ml-1 w-full cursor-pointer rounded-lg border-2 border-gray-200 bg-white p-5 text-gray-500 peer-checked:border-blue-600 peer-checked:text-gray-600 hover:bg-gray-50 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:peer-checked:border-blue-600 dark:peer-checked:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300"
			>
				<div class="block text-center">
					<div class="w-full text-sm font-semibold">{area.name}</div>
				</div>
			</label>
		</div>
	{/each}
</div>
