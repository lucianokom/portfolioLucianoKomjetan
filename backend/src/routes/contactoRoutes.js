import express from "express"
import { obtenerContacto,
    crearContacto 
} from "../controllers/contactoController.js"

const router = express.Router();

router.get("/", obtenerContacto);

router.post("/", crearContacto);

export default router;