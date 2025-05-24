<script>
	import CategoryPicker from './CategoryPicker.svelte';
	import { Drawer, Button, CloseButton, A} from 'flowbite-svelte';
	import { InfoCircleSolid, ArrowRightOutline, AngleRightOutline, AdjustmentsVerticalOutline } from 'flowbite-svelte-icons';

	let hiddenBackdropTrue = $state(true);
</script>

<div class="fixed top-4 left-4">
<Button onclick={() => (hiddenBackdropTrue = false)} class="text-gray-200 bg-gray-800 hover:bg-gray-600"><AngleRightOutline /></Button>
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
</Drawer>