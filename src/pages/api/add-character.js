import { sql } from '@vercel/postgres';
 
export default async function handler(req, res) {
  try {
    const {nombre, raza, clase, nivel, apt1Arr, CDP, apt2Mas, usuario} = req.body;
    console.log(nombre, raza, clase, nivel, apt1Arr, CDP, apt2Mas, usuario)
    await sql`INSERT INTO Personajes (Nombre, Raza, Clase, Nivel, Apt1Arr, Cdp, Apt2Mas, Usuario) VALUES (${nombre}, ${raza}, ${clase}, ${nivel}, ${apt1Arr}, ${CDP}, ${apt2Mas}, ${usuario});`;
    res.status(200).send('todo ok')
  } catch (error) {
    return res.status(500).json({ error });
  }
}