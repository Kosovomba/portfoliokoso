import { sql } from '@vercel/postgres';
 
export default async function handler(req, res) {
  const usuario2 = await sql`SELECT * FROM Usuarios WHERE Name=${req.body.name};`;
  const usuario = usuario2.rows
  return usuario[0].password === req.body.password?res.status(200).json(true):res.status(200).json('Password incorrect');
}