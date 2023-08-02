import { sql } from '@vercel/postgres';
 
export default async function handler(req, res) {
  const usuarios2 = await sql`SELECT * FROM Usuarios;`;
  const usuarios = usuarios2.rows
  console.log(usuarios)
  let userNames = [], userEMails = []
  if (usuarios.length > 0) {
    userNames = usuarios.map((u) => u.name)
    userEMails = usuarios.map((u) => u.email)
    console.log(userNames)
    console.log(userEMails)
  }
  return res.status(200).json({ usuarios, userNames, userEMails });
}