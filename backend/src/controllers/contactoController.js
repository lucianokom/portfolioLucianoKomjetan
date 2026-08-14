import { guardarContacto } from "../services/contactoService.js";

export function obtenerContacto(req,res){
    res.send("controlador de contactos funcionando");
}

export async function crearContacto(req,res){
    const error = check_data(req,res);
    
    if (error) {

        console.error(error);

        return res.status(400).json({
            error: error
        });
    }

     try {

        const contacto = await guardarContacto(req.body);

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

const check_data = (req,res) => {
    const {nombre, email, mensaje} = req.body;
    if (nombre.trim() === ""){
        return "El nombre es vacio";
    } 
    if (email.trim() === ""){
        return "El email es obligatorio";
    }
    if (mensaje.trim() === ""){
        return "El mensaje es vacio";
    } 

    return null;
}