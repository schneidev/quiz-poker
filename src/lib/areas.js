import fs from 'fs/promises';
import path from 'path';

const AREAS_PATH = path.resolve('src/lib/data/areas.json');

export async function loadAreas() {
  const data = await fs.readFile(AREAS_PATH, 'utf-8');
  return JSON.parse(data);
}

export async function saveAreas(areas) {
  await fs.writeFile(AREAS_PATH, JSON.stringify(areas, null, 2));
}

export async function getActivatedAreas() {
  let areas = await loadAreas();
  return areas.filter((x) => x.activated);
}