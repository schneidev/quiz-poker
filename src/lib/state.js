import { writable } from "svelte/store";
import { browser } from "$app/environment";

const defaultAreas = [
	{
		name: "Politik",
		activated: true
	},
	{
		name: "Gesellschaft",
		activated: true
	},
	{
		name: "Sport",
		activated: true
	},
	{
		name: "Wissenschaft",
		activated: true
	},
	{
		name: "Unnützes Wissen",
		activated: true
	},
	{
		name: "Ernährung",
		activated: true
	},
	{
		name: "Geographie",
		activated: true
	},
	{
		name: "Geschichte",
		activated: true
	},
	{
		name: "Kunst und Kultur",
		activated: true
	},
	{
		name: "Technik",
		activated: true
	},
	{
		name: "Musik",
		activated: true
	},
	{
		name: "Trivia",
		activated: true
	},
	{
		name: "Religion",
		activated: true
	},
	{
		name: "Gaming",
		activated: true
	}
];

function createAreasState() {
	let stored = defaultAreas;

	if (browser) {
		const json = localStorage.getItem("areas");
		if (json) {
			try {
				stored = JSON.parse(json);
			} catch (e) {
				console.error("Fehler beim Parsen von localStorage:", e);
			}
		}
	}

	const areas = writable(stored);

	if (browser) {
		areas.subscribe((value) => {
			localStorage.setItem("areas", JSON.stringify(value));
		});
	}

	return areas;
}

export const areas = createAreasState();
