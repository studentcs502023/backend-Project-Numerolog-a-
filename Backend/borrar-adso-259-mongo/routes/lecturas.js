import { Router } from "express"
import { check } from "express-validator"
import  lecturasController  from "../controllers/lecturas.js"


const router = Router()

// ✅ CREAR LECTURA
router.post(
  "/:idUsuario",
  [ check("idUsuario").isMongoId()],
  lecturasController.generarLecturaNumerologica
);

router.post(
  "/:idUsuario",
  [ check("idUsuario").isMongoId()],
  lecturasController.generarLecturaDiaria
);



// ✅ LISTAR LECTURAS POR USUARIO
router.get(
  "/usuario/:userid",
  [
    check("userid").isMongoId()
  ],
  lecturasController.obtenerLecturasPorUsuario
)

// ✅ ELIMINAR LECTURA


export default router
