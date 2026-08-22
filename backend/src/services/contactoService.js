import pool from "../config/database.js";

export async function guardarContacto({ input }) {

    const { nombre, email, mensaje } = input;
//checkear porque sigue sumando los id incluso cuando da error 
    const resultado = await pool.query(
        `INSERT INTO contactos (nombre, email, mensaje)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [nombre, email, mensaje]
    );

    return resultado.rows[0];
}
