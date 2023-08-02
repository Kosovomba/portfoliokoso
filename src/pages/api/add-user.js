import { sql } from '@vercel/postgres';
 
export default async function handler(req, res) {
  try {
    const {name, eMail, avatar, password} = req.body;
    if (!name || !password) throw new Error('name and password required');
    await sql`INSERT INTO Usuarios (Name, Password, EMail, Avatar) VALUES (${name}, ${password}, ${eMail}, ${avatar});`;
    res.status(200).send('todo ok')
  } catch (error) {
    return res.status(500).json({ error });
  }
}