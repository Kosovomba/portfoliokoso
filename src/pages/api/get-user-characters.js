import { sql } from '@vercel/postgres';
 
export default async function handler(req, res) {  
  const personajes2 = await sql`SELECT * FROM Personajes WHERE Usuario=${req.body.name};`;
  const personajes = personajes2.rows
  return res.status(200).json(personajes);
}