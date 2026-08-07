import pool from "../config/database.js";

export async function guardarContacto(datos) {

    const { nombre, email, mensaje } = datos;

    const resultado = await pool.query(
        `INSERT INTO contactos (nombre, email, mensaje)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [nombre, email, mensaje]
    );

    return resultado.rows[0];
}