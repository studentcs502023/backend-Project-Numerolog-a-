
import { Router } from "express";
import { deleteUsuario, getUsuario, getUsuarioEmail, postUsuario, putUsuario, putUsuarioActivar, putUsuarioInactivar,loginUsuario } from "../controllers/usuario.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";
import { validarEmail,validarExisteUsuario} from "../helpers/usuarios.js";
import { validarJWT } from '../middlewares/validar-jwt.js'


const router = new Router()

router.get(   "/", getUsuario)

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

  check('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre debe tener entre 3 y 50 caracteres')
    .trim(),

check('role')
  .notEmpty()
  .isInt({ min: 0, max: 1 })
  .withMessage('Role inválido'),

  check('fechanacimiento')
    .optional()
    .isISO8601()
    .withMessage('Formato de fecha no válido (YYYY-MM-DD)'),

  check('email')
    .notEmpty()
    .withMessage('El correo es obligatorio')
    .isEmail()
    .withMessage('Correo no válido'),

check('password')
  .notEmpty()
  .withMessage("La contraseña es obligatoria")
  .isLength({ min: 6 })
  .withMessage("La contraseña debe tener al menos 6 caracteres"),


  validarCampos

], postUsuario);

// router.post("/", [
//   check("nombre").notEmpty().isLength({ min: 3 }),
//   check("apellido").notEmpty().isAlpha("es-ES", { ignore: " " }),
//   check("edad").isNumeric(),
//   check("fechanacimiento").isISO8601(),

//   check("correo")
//     .isEmail()
//     .withMessage("Correo no válido")
//     .custom(validarEmail),
//   validarCampos
// ], postUsuario);

// router.post("/", [
//   check("nombre").notEmpty().isLength({ min: 3 }),
//   check("edad").isNumeric(),
//   check("fechanacimiento").isISO8601(),

//   check("email")
//     .isEmail()
//     .withMessage("email no válido")
//     .custom(validarEmail),

//   check("password")
//     .notEmpty()
//     .isLength({ min: 6 }),

//   validarCampos
// ], postUsuario);


router.post('/login', [
  check('email', 'El email es obligatorio').not().isEmpty(),
  check('email', 'No es un email válido').isEmail(),
  check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
  validarCampos
], loginUsuario)

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