import express from "express";
const router = express.Router();
import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

// Area Pública
router.post("/", registrar);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);

router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

// Area privada
router.get("/perfil", checkAuth, perfil);

export default router;
