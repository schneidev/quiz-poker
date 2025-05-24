<script>
	import { fade } from 'svelte/transition';

	let { phase } = $props();

	const activatedClass =
		"flex md:w-full items-center dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700";
	const deactivatedClass =
		"flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700";
	const activatedClassLast = 'flex items-center dark:text-blue-500';
	const deactivatedClassLast = 'flex items-center';
</script>

<div class="mt-8 mb-8 w-full">
	<ol
		class="mt-8 hidden w-full items-center text-center text-sm font-medium text-gray-500 sm:text-base md:mt-2 md:flex dark:text-gray-400"
	>
		<li transition:fade class={phase > 0 ? activatedClass : deactivatedClass}>
			<span
				class="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden dark:after:text-gray-500"
			>
				{#if phase > 0}
					<svg
						class="me-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
						/>
					</svg>
				{:else}
					<span class="me-2">1</span>
				{/if}
				<span class="text-nowrap">Pre-Flop</span>
			</span>
		</li>
		<li transition:fade class={phase > 1 ? activatedClass : deactivatedClass}>
			<span
				class="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden dark:after:text-gray-500"
			>
				{#if phase > 1}
					<svg
						class="me-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
						/>
					</svg>
				{:else}
					<span class="me-2">2</span>
				{/if}
				Flop
			</span>
		</li>
		<li transition:fade class={phase > 2 ? activatedClass : deactivatedClass}>
			<span
				class="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden dark:after:text-gray-500"
			>
				{#if phase > 2}
					<svg
						class="me-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
						/>
					</svg>
				{:else}
					<span class="me-2">3</span>
				{/if}
				Turn
			</span>
		</li>
		<li transition:fade class={phase > 3 ? activatedClass : deactivatedClass}>
			<span
				class="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden dark:after:text-gray-500"
			>
				{#if phase > 3}
					<svg
						class="me-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
						/>
					</svg>
				{:else}
					<span class="me-2">4</span>
				{/if}
				River
			</span>
		</li>
		<li class={phase > 4 ? activatedClassLast : deactivatedClassLast}>
			{#if phase > 4}
				<svg
					class="me-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
					/>
				</svg>
			{:else}
				<span class="me-2">5</span>
			{/if}
			Showdown
		</li>
	</ol>
</div>
