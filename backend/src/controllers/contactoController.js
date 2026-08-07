import { guardarContacto } from "../services/contactoService.js";

export function obtenerContacto(req,res){
    res.send("controlador de contactos funcionando");
}

export async function crearContacto(req,res){
     try {

        const contacto = await guardarContacto(req.body);

        res.status(201).json(contacto);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al guardar el contacto"
        });

    }
}