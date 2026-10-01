import { guardarContacto } from "../services/contactoService.js";
import { validateMessage } from "../middlewares/schemas.js";

export function obtenerContacto(req, res) {
    res.send("controlador de contactos funcionando");
}

export async function crearContacto(req, res) {
    const result = validateMessage(req.body);

    if (result.error) {
        console.error(result.error);
        return res.status(400).json({
            error: result.error.issues
        });
    }

    try {
        const contacto = await guardarContacto({ input: result.data });
        return res.status(201).json({
            mensaje: "Contacto enviado correctamente",
            contacto: contacto
        });
    } catch (excepcion) {
        console.error(excepcion);
        return res.status(500).json({
            error: "Error al guardar el contacto"
        });
    }
}

