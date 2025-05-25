<script>
	import { onMount } from "svelte";
	import { areas } from "$lib/state.js";
	import { CheckboxButton, Button } from "flowbite-svelte";

	function selectAll() {
		areas.update((areas) => areas.map((area) => ({ ...area, activated: true })));
	}

	function deselectAll() {
		areas.update((areas) => areas.map((area) => ({ ...area, activated: false })));
	}
</script>

<div class="grid w-full grid-cols-2 gap-2">
	<Button outline color="gray" class="cursor-pointer" onclick={() => selectAll()}>Alle</Button>
	<Button outline color="gray" class="cursor-pointer" onclick={() => deselectAll()}>Keins</Button>
	{#each $areas as area, index}
		<div class="flex">
			<input
				type="checkbox"
				id={`area-${index}`}
				bind:checked={area.activated}
				class="peer hidden"
			/>
			<label
				for={`area-${index}`}
				class="w-full cursor-pointer rounded-lg border-2 peer-checked:border-blue-600 peer-checked:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:peer-checked:border-blue-600 dark:peer-checked:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300"
			>
				<div class="flex h-full w-full items-center justify-center p-2 text-center">
					{area.name}
				</div>
			</label>
		</div>
	{/each}
</div>
