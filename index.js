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

const servidor = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Socket Io
import { Server } from "socket.io";
const io = new Server(servidor, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

io.on("connection", (socket) => {
  // Eventos
  socket.on("abrir proyecto", (proyecto) => {
    socket.join(proyecto);
  });

  socket.on("nueva tarea", (tarea) => {
    socket.to(tarea.proyecto).emit("tarea agregada", tarea);
  });
  socket.on("eliminar tarea", (tarea) => {
    const proyecto = tarea.proyecto;
    socket.to(proyecto).emit("tarea eliminada", tarea);
  });

  socket.on("actualizar tarea", (tarea) => {
    const proyecto = tarea.proyecto._id;
    socket.to(proyecto).emit("tarea actualizada", tarea);
  });

  socket.on("cambiar estado", (tarea) => {
    const proyecto = tarea.proyecto._id;
    socket.to(proyecto).emit("nuevo estado", tarea);
  });
});
