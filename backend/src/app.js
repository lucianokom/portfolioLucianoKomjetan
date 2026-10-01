import 'dotenv/config';    
import express from "express";
import cors from "cors";
import contactoRoutes from "./routes/contactoRoutes.js";

const app = express();

const corsOptions = {
    origin: "https://lucianokom.github.io",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/contacto", contactoRoutes);

export default app;