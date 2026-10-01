import { transporter } from "../config/nodemailer.js";

export async function guardarContacto({ input }) {

    const { nombre, email, mensaje } = input;
    
    // Enviar correo de notificación
    await Promise.all([
        enviarNotificacion(nombre, email, mensaje),
        enviarCorreoConfirmacion(nombre, email)
    ]);
    
    return { nombre, email, mensaje };
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


    await transporter.sendMail({
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

    await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email, // Responder al correo del contacto
        subject: "Confirmación de contacto desde tu portafolio",
        text: textoConfirmacion,
    });
}

