import { loadAreas, saveAreas } from "$lib/areas"

export async function GET() {
  const areas = await loadAreas();
  return new Response(JSON.stringify(areas), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function PATCH({ request }) {
  const { name, activated } = await request.json();
  const areas = await loadAreas();

  const index = areas.findIndex(area => area.name === name);
  if (index === -1) {
    return new Response(JSON.stringify({ error: 'Area not found' }), { status: 404 });
  }

  areas[index].activated = activated;
  await saveAreas(areas);

  return new Response(JSON.stringify({ success: true }));
}
