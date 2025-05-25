<script>
	import { Tabs, TabItem } from "flowbite-svelte";
	import {
		UserCircleSolid,
		GridSolid,
		AdjustmentsVerticalSolid,
		ClipboardSolid
	} from "flowbite-svelte-icons";
</script>

<div class="mt-8 w-full md:w-3/4">
	<Tabs tabStyle="underline">
		<TabItem open title="🌀 Pre-Flop">
			<p class="text-sm dark:text-gray-400">
				Alle Spieler bekommen die gleiche Schätzfrage (z. B. "Wie viele Liter Wasser trinkt ein
				Mensch im Jahr?"). Jeder schreibt heimlich eine Antwort auf seinen Zettel - nicht zeigen!
				Dann beginnt die erste Setzrunde, wie beim Poker: Es gibt einen Small Blind und einen Big
				Blind (Pflicht-Einsätze, reihum). Danach kann jeder mitgehen, erhöhen oder aussteigen
				(„folden“).
			</p>
		</TabItem>
		<TabItem title="🔍 Flop">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				Ein Hinweis zur Antwort wird gegeben (z. B. „Es sind weniger als 1000 Liter“). Es folgt eine
				zweite Setzrunde.
			</p>
		</TabItem>
		<TabItem title="🧩 Turn">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				Ein weiterer Tipp zur Antwort wird aufgedeckt (z. B. „Es sind mehr als 400 Liter“). Dritte
				Setzrunde wie zuvor.
			</p>
		</TabItem>
		<TabItem title="💡 River">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				Der letzte Hinweis wird aufgedeckt (z. B. „Die Zahl ist zwischen 500 und 700“). Vierte und
				letzte Setzrunde.
			</p>
		</TabItem>
		<TabItem title="🏁 Showdown">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				Jetzt wird die richtige Antwort bekanntgegeben. Alle Spieler, die nicht ausgestiegen sind,
				decken ihre Zettel auf. Der Spieler, dessen Antwort am nächsten dran ist, gewinnt den
				gesamten Pot (alle gesetzten Chips dieser Runde).
			</p>
		</TabItem>
	</Tabs>
</div>
