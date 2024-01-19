import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectosRoutes from "./routes/proyectoRoutes.js";
import tareasRoutes from "./routes/tareaRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

dotenv.config();

conectarDB();

// Configurar cors
const whileList = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (whileList.includes(origin)) {
      // Puede consultar la API
      callback(null, true);
    } else {
      // No es permitido
      callback(new Error("Error de cors"));
    }
  },
};

app.use(cors(corsOptions));

// Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectosRoutes);
app.use("/api/tareas", tareasRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
