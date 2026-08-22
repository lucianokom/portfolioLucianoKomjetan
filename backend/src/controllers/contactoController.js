import { guardarContacto } from "../services/contactoService.js";
import { validateMessage } from "../middlewares/schemas.js";

export function obtenerContacto(req,res){
    res.send("controlador de contactos funcionando");
}

export async function crearContacto(req,res){
    const result = validateMessage(req.body);

    console.log(result.data)

    if (result.error) {

        console.error(error);

        return res.status(400).json({
            error: error
        });
    }

     try {

        const contacto = await guardarContacto({input : result.data});

        return res.status(201).json({
            mensaje: "Contacto enviado correctamente"
        });

    } catch (exepcion) {

        console.error(exepcion);

        return res.status(500).json({
            exepcion: "Error al guardar el contacto"
        });

    }
}

