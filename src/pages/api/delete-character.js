import { sql } from '@vercel/postgres';
 
export default async function handler(req, res) {
  try {
    const {ID} = req.body;
    console.log(ID)
    await sql`DELETE FROM Personajes WHERE Id = ${ID};`;
    res.status(200).send('todo ok')
  } catch (error) {
    return res.status(500).json({ error });
  }
}