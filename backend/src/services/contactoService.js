import pool from "../config/database.js";
import { transporter } from "../config/nodemailer.js";

export async function guardarContacto({ input }) {

    const { nombre, email, mensaje } = input;
    
    // 1. Guardar en PostgreSQL
    const contacto = await persistirMensaje(nombre, email, mensaje);
    
    // 2. Enviar correo de notificación
    await enviarNotificacion(nombre, email, mensaje);
    
    //3. Enviar correo de confirmacion al contacto
    await enviarCorreoConfirmacion(nombre, email);

    return contacto;
}

async function persistirMensaje(nombre, email, mensaje) {
    const resultado = await pool.query(
        `INSERT INTO contactos (nombre, email, mensaje)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [nombre, email, mensaje]
    );
    return resultado.rows[0];
}

async function enviarNotificacion(nombre, email, mensaje) {
    
    const textoNotificacion = `
    NUEVO CONTACTO - PORTFOLIO

    Nombre:
    ${nombre}
    Email:
    ${email}
    Mensaje:
    ----------------------------------------
    ${mensaje}
    ----------------------------------------
    Este mensaje fue enviado desde tu portfolio.
    `;


    transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        replyTo: email,
        subject: "Te contactaron desde tu portafolio",
        text: textoNotificacion,
    });
}

async function enviarCorreoConfirmacion(nombre, email) {
    
    const textoConfirmacion = `
    Hola estimado/a ${nombre}:

    Gracias por contactarme.

    Recibí correctamente tu mensaje.
    
    Muchas gracias y Saludos,
    Luciano
    `;

    transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email, // Responder al correo del contacto
        subject: "Confirmación de contacto desde tu portafolio",
        text: textoConfirmacion,
    });
}

