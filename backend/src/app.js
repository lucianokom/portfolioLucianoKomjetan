import 'dotenv/config';    
import express from "express";
import cors from "cors";
import contactoRoutes from "./routes/contactoRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/contacto", contactoRoutes);

export default app;