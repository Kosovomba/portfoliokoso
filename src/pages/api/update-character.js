import { sql } from '@vercel/postgres';
 
export default async function handler(req, res) {
  try {
    const {nombre, raza, clase, nivel, apt1Arr, CDP, apt2Mas, usuario, equipamiento, PE, ID} = req.body;
    console.log(nombre, raza, clase, nivel, apt1Arr, CDP, apt2Mas, usuario, equipamiento, PE)
    await sql`UPDATE Personajes SET Nombre = ${nombre}, Raza = ${raza}, Clase = ${clase}, Nivel = ${nivel}, Apt1Arr = ${apt1Arr}, Cdp = ${CDP}, Apt2Mas = ${apt2Mas}, Usuario = ${usuario}, Equipamiento = ${equipamiento}, PE = ${PE} WHERE ID = ${ID};`;
    res.status(200).send('todo ok')
  } catch (error) {
    return res.status(500).json({ error });
  }
}