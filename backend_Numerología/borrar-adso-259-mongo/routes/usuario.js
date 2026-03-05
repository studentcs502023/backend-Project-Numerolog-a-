
import { Router } from "express";
import { deleteUsuario, getUsuario, getUsuarioEmail, postUsuario, putUsuario, putUsuarioActivar, putUsuarioInactivar } from "../controllers/usuario.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";
import { validarEmail,validarExisteUsuario} from "../helpers/usuarios.js";

const router = new Router()

router.get(   "/",getUsuario)

router.get(   "/email"  , [
    check('email').not().isEmpty(),
    check('email',"No es un email valido").isEmail().normalizeEmail(),
    validarCampos
] ,getUsuarioEmail)

// router.post("/", [
//     check('nombre').not().isEmpty().isLength({min:3,max:50}).trim().escape(),
// check('apellido')
//   .notEmpty()
//   .isAlpha('es-ES', { ignore: ' ' })
//   .withMessage('El apellido solo debe contener letras'),
//     check('edad').isNumeric(),
//     check('fechanacimiento',"formato de fecha no valido").isISO8601().isDate(),
//     check('fechaCita').isAfter(new Date().toDateString()),
//     check('email').isEmail(),    
//     check("correo")
//       .isEmail()
//       .withMessage("Correo no válido")
// .custom(validarEmail),
//     validarCampos
//   ],postUsuario)

router.post("/", [
  check("nombre").notEmpty().isLength({ min: 3 }),
  check("apellido").notEmpty().isAlpha("es-ES", { ignore: " " }),
  check("edad").isNumeric(),
  check("fechanacimiento").isISO8601(),

  check("correo")
    .isEmail()
    .withMessage("Correo no válido")
    .custom(validarEmail),
  validarCampos
], postUsuario);


router.put("/:id", [    
    check('nombre').notEmpty(),
    check('id').isMongoId(),
    check('id').custom(validarExisteUsuario),
    validarCampos
],putUsuario)

router.put("/activar/:id",putUsuarioActivar)

router.put("/inactivar/:id",putUsuarioInactivar)

router.delete("/:id", deleteUsuario)

export default router
