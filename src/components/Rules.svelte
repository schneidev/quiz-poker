<script>
	let openIndex = 0;

	function toggle(index) {
		openIndex = openIndex === index ? -1 : index;
	}
</script>

<div class="mt-8 w-1/2 md:w-full flex-1">
	<p class="mb-2 text-xl text-gray-500 dark:text-gray-400">
		Quiz Poker ist ein Spiel, das das spannende Setzen und Bluffen von Poker mit kniffligen
		Schätzfragen kombiniert. Statt Spielkarten bekommst du eine Schätzfrage - und dein Wissen (oder
		dein Bluff) entscheidet, wie weit du kommst!
	</p>
    <h2 class="mt-8 text-2xl font-normal text-gray-500 dark:text-gray-400">Phasen</h2>
	<div id="accordion-collapse" data-accordion="collapse">
		<h2 id="accordion-collapse-heading-1">
			<button
				type="button"
				class="flex w-full items-center justify-between gap-3 rounded-t-xl border border-b-0 border-gray-200 p-5 font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rtl:text-right dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
				aria-expanded={openIndex === 0}
				aria-controls="accordion-collapse-body-1"
				on:click={() => toggle(0)}
			>
				<span>🌀 1. Die Schätzfrage („Pre-Flop“)</span>
				<svg
					data-accordion-icon
					class="h-3 w-3 shrink-0 {openIndex === 0 ? '' : 'rotate-180'}"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 10 6"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 5 5 1 1 5"
					/>
				</svg>
			</button>
		</h2>
		<div
			id="accordion-collapse-body-1"
			class={openIndex === 0 ? '' : 'hidden'}
			aria-labelledby="accordion-collapse-heading-1"
		>
			<div class="border border-b-0 border-gray-200 p-5 dark:border-gray-700 dark:bg-gray-900">
				<p class="mb-2 text-gray-500 dark:text-gray-400">
					Alle Spieler bekommen die gleiche Schätzfrage (z. B. "Wie viele Liter Wasser trinkt ein
					Mensch im Jahr?"). Jeder schreibt heimlich eine Antwort auf seinen Zettel – nicht zeigen!
					Dann beginnt die erste Setzrunde, wie beim Poker: Es gibt einen Small Blind und einen Big
					Blind (Pflicht-Einsätze, reihum). Danach kann jeder mitgehen, erhöhen oder aussteigen
					(„folden“).
				</p>
			</div>
		</div>
		<h2 id="accordion-collapse-heading-2">
			<button
				type="button"
				class="flex w-full items-center justify-between gap-3 rounded-t-xl border border-b-0 border-gray-200 p-5 font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rtl:text-right dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
				aria-expanded={openIndex === 1}
				aria-controls="accordion-collapse-body-2"
				on:click={() => toggle(1)}
			>
				<span>🔍 2. Der erste Tipp („Flop“)</span>
				<svg
					data-accordion-icon
					class="h-3 w-3 shrink-0 {openIndex === 1 ? '' : 'rotate-180'}"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 10 6"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 5 5 1 1 5"
					/>
				</svg>
			</button>
		</h2>
		<div
			id="accordion-collapse-body-2"
			class={openIndex === 1 ? '' : 'hidden'}
			aria-labelledby="accordion-collapse-heading-2"
		>
			<div class="border border-b-0 border-gray-200 p-5 dark:border-gray-700 dark:bg-gray-900">
				<p class="mb-2 text-gray-500 dark:text-gray-400">
					Ein Hinweis zur Antwort wird gegeben (z. B. „Es sind weniger als 1000 Liter“). Es folgt
					eine zweite Setzrunde.
				</p>
			</div>
		</div>
		<h2 id="accordion-collapse-heading-3">
			<button
				type="button"
				class="flex w-full items-center justify-between gap-3 rounded-t-xl border border-b-0 border-gray-200 p-5 font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rtl:text-right dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
				aria-expanded={openIndex === 1}
				aria-controls="accordion-collapse-body-3"
				on:click={() => toggle(2)}
			>
				<span>🧩 3. Der zweite Tipp („Turn“)</span>
				<svg
					data-accordion-icon
					class="h-3 w-3 shrink-0 {openIndex === 1 ? '' : 'rotate-180'}"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 10 6"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 5 5 1 1 5"
					/>
				</svg>
			</button>
		</h2>
		<div
			id="accordion-collapse-body-3"
			class={openIndex === 2 ? '' : 'hidden'}
			aria-labelledby="accordion-collapse-heading-3"
		>
			<div class="border border-b-0 border-gray-200 p-5 dark:border-gray-700 dark:bg-gray-900">
				<p class="mb-2 text-gray-500 dark:text-gray-400">
					Ein weiterer Tipp zur Antwort wird aufgedeckt (z. B. „Es sind mehr als 400 Liter“). Dritte
					Setzrunde wie zuvor.
				</p>
			</div>
		</div>
		<h2 id="accordion-collapse-heading-4">
			<button
				type="button"
				class="flex w-full items-center justify-between gap-3 rounded-t-xl border border-b-0 border-gray-200 p-5 font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rtl:text-right dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
				aria-expanded={openIndex === 1}
				aria-controls="accordion-collapse-body-4"
				on:click={() => toggle(3)}
			>
				<span>💡 4. Der letzte Tipp („River“)</span>
				<svg
					data-accordion-icon
					class="h-3 w-3 shrink-0 {openIndex === 1 ? '' : 'rotate-180'}"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 10 6"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 5 5 1 1 5"
					/>
				</svg>
			</button>
		</h2>
		<div
			id="accordion-collapse-body-4"
			class={openIndex === 3 ? '' : 'hidden'}
			aria-labelledby="accordion-collapse-heading-4"
		>
			<div class="border border-b-0 border-gray-200 p-5 dark:border-gray-700 dark:bg-gray-900">
				<p class="mb-2 text-gray-500 dark:text-gray-400">
					Der letzte Hinweis wird aufgedeckt (z. B. „Die Zahl ist zwischen 500 und 700“). Vierte und
					letzte Setzrunde.
				</p>
			</div>
		</div>
		<h2 id="accordion-collapse-heading-5">
			<button
				type="button"
				class="flex w-full items-center justify-between gap-3 rounded-t-xl border border-b-0 border-gray-200 p-5 font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rtl:text-right dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
				aria-expanded={openIndex === 1}
				aria-controls="accordion-collapse-body-5"
				on:click={() => toggle(4)}
			>
				<span>🏁 5. Die Auflösung ("Showdown")</span>
				<svg
					data-accordion-icon
					class="h-3 w-3 shrink-0 {openIndex === 1 ? '' : 'rotate-180'}"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 10 6"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 5 5 1 1 5"
					/>
				</svg>
			</button>
		</h2>
		<div
			id="accordion-collapse-body-5"
			class={openIndex === 4 ? '' : 'hidden'}
			aria-labelledby="accordion-collapse-heading-5"
		>
			<div class="border border-b-0 border-gray-200 p-5 dark:border-gray-700 dark:bg-gray-900">
				<p class="mb-2 text-gray-500 dark:text-gray-400">
					Jetzt wird die richtige Antwort bekanntgegeben. Alle Spieler, die nicht ausgestiegen sind,
					decken ihre Zettel auf. Der Spieler, dessen Antwort am nächsten dran ist, gewinnt den
					gesamten Pot (alle gesetzten Chips dieser Runde).
				</p>
			</div>
		</div>
	</div>
</div>

<!-- <div class="mt-8 flex-1">
	<p class="text-center text-2xl font-normal text-gray-500 dark:text-gray-400">
		Willkommen zu Quiz Poker!
	</p>
	<p class="mt-8 text-xl font-normal text-gray-500 dark:text-gray-400">
		
		
        
        
        
        
        
        
        
         
	</p>
	<span class="text-2xl font-normal text-gray-500 dark:text-gray-400">🎯 Ziel</span>
	<p class="text-xl font-normal text-gray-500 dark:text-gray-400">
		Am Ende jeder Runde gewinnt der Spieler, der mit seiner Schätzung am nächsten an der richtigen
		Antwort liegt - und noch im Spiel ist!
	</p>
	<span class="text-2xl font-normal text-gray-500 dark:text-gray-400">📋 Spielvorbereitung</span>
	<p class="text-xl font-normal text-gray-500 dark:text-gray-400">
		Jeder Spieler bekommt gleich viele Chips. Es wird ein Spielleiter bestimmt (optional), der die
		Fragen und Tipps vorbereitet. Jeder braucht einen Zettel und einen Stift, um seine Antwort
		geheim aufzuschreiben.
	</p>
	<span class="text-2xl font-normal text-gray-500 dark:text-gray-400">🎯 Phasen</span>
	<ul>
		<li class="text-xl font-normal text-gray-500 dark:text-gray-400">
			🌀 1. Die Schätzfrage („Pre-Flop“)
			<ul>
				<li>
					
				</li>
			</ul>
		</li>
	</ul>
</div> -->
