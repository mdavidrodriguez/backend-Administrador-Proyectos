import mongoose from "mongoose";

const proyectoSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    descripcion: {
      type: String,
      trim: true,
      required: true,
    },
    fechaEntrega: {
      type: Date,
      default: Date.now(),
    },
    cliente: {
      type: String,
      trim: true,
      required: true,
    },
    creador: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Usuario",
    },
    tareas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tarea",
      },
    ],
    colaboradores: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Usuario",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Proyecto = mongoose.model("Proyecto", proyectoSchema);
export default Proyecto;
