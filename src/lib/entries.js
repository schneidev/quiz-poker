import fs from 'fs/promises';
import path from 'path';

const ENTRIES_PATH = path.resolve('src/lib/data/entries.json');

export async function loadEntries() {
  const data = await fs.readFile(ENTRIES_PATH, 'utf-8');
  return JSON.parse(data);
}

export async function saveEntries(entries) {
  await fs.writeFile(ENTRIES_PATH, JSON.stringify(entries, null, 2));
}

export async function addEntry(entry) {
  let entries = await loadEntries()
  entries.push(entry);
  saveEntries(entries)
}