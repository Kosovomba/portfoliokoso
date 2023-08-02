// import { sql } from '@vercel/postgres';
 
// export default async function handler(request, response) {
//   try {
//     const result =
//       await sql`CREATE TABLE Usuarios ( Name varchar(255), Password varchar(255), EMail varchar(255), Avatar varchar(255));`;
//     return response.status(200).json({ result });
//   } catch (error) {
//     return response.status(500).json({ error });
//   }
// }