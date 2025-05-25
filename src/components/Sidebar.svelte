<script>
	import CategoryPicker from "./CategoryPicker.svelte";
	import { Drawer, Button, CloseButton, A, Input } from "flowbite-svelte";
	import {
		InfoCircleSolid,
		ArrowRightOutline,
		AngleRightOutline,
		AdjustmentsVerticalOutline
	} from "flowbite-svelte-icons";
	import { areas } from "$lib/state";

	let hiddenBackdropTrue = $state(true);
	let newCategory = $state("");

	function addCategory(category) {
		category = category.trim();
		if (category === "") {
			console.error("Category name cannot be empty");
			return;
		}
		areas.update((areas) => [...areas, { name: category, activated: true }]);
		newCategory = "";
	}

	function removeCategory(category) {
		category = category.trim();
		if (category === "") {
			console.error("Category name cannot be empty");
			return;
		}
		areas.update((areas) =>
			areas.filter((area) => area.name.toLowerCase() !== category.toLowerCase())
		);
		newCategory = "";
	}
</script>

<div class="fixed top-4 left-4">
	<Button
		onclick={() => (hiddenBackdropTrue = false)}
		class="bg-gray-800 text-gray-200 hover:bg-gray-600"><AngleRightOutline /></Button
	>
</div>

<Drawer backdrop={true} bind:hidden={hiddenBackdropTrue}>
	<div class="flex items-center justify-between">
		<h5
			id="drawer-label"
			class="mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
		>
			<AdjustmentsVerticalOutline class="me-2.5 h-5 w-5" />Kategorien
		</h5>
		<CloseButton onclick={() => (hiddenBackdropTrue = true)} class="mb-4 dark:text-white" />
	</div>
	<CategoryPicker />
	<Input
		type="text"
		id="new_category_input"
		placeholder="Neue Kategorie"
		class="mt-4"
		bind:value={newCategory}
	/>
	<div class="mt-2 flex flex-row justify-end gap-2">
		<Button
			outline
			color="red"
			class="w-full cursor-pointer"
			onclick={() => removeCategory(newCategory)}>Löschen</Button
		>
		<Button
			outline
			color="blue"
			class="w-full cursor-pointer"
			onclick={() => addCategory(newCategory)}>Hinzufügen</Button
		>
	</div>
</Drawer>
