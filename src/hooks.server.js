import dotenv from 'dotenv';
dotenv.config();

export async function handle({ event, resolve }) {
  return resolve(event); // Einfach weitergeben, keine Logik nötig
}