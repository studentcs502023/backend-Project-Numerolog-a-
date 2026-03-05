<<<<<<< HEAD
import { Router } from "express"
import { check } from "express-validator"
import  lecturasController  from "../controllers/lecturas.js"

=======
import express from "express";
import { check } from "express-validator";
import { postLectura } from "../controllers/lecturas.js";
import { validarCampos } from "../middlewares/validar-campos.js";
>>>>>>> b46e2fb1a6e3d11aed1efc625ea4323ee896ee2e

const router = express.Router();

router.post(
<<<<<<< HEAD
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

=======
  "/",
  [
    check("usuario_id", "ID inválido").isMongoId(),
    check("tipo").isIn(["principal", "diaria"])
  ],
  validarCampos,
  postLectura
);


export default router;


// router.post(
//   "/",
//   [
//     check("userid")
//       .not().isEmpty()
//       .isMongoId(),

//     check("tipo_lectura")
//       .not().isEmpty()
//       .isString(),

//     check("contenido")
//       .not().isEmpty()
//       .isString()
//   ],
//   validarResults,
//   postlecturas
// )

// ✅ LISTAR LECTURAS POR USUARIO
// router.get(
//   "/usuario/:userid",
//   [
//     check("userid").isMongoId()
//   ],
//   validarResults,
//   getlecturas
// )

// ✅ ELIMINAR LECTURA
// router.delete(
//   "/:id",
//   [
//     check("id").isMongoId()
//   ],
//   validarResults,
//   deletelecturas
// )
>>>>>>> b46e2fb1a6e3d11aed1efc625ea4323ee896ee2e

