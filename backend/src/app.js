import 'dotenv/config';    
import express from "express";
import contactoRoutes from "./routes/contactoRoutes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/contacto", contactoRoutes);

app.listen(3000, () => {
    console.log("Servidor funcionando en puerto 3000");
});