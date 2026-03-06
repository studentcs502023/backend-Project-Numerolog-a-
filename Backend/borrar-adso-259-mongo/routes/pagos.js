import express from "express"
import { check } from "express-validator"
import { postpagos, getpagos, putpagos,deletepagos } from "../controllers/pagos.js"
import validarResults from "../middlewares/validar-campos.js"

const router = express.Router()


router.delete(
  "/:usuario_id",  // Usamos `:usuario_id` como parámetro de la URL
  [
    check("usuario_id").isMongoId()  // Validamos que el `usuario_id` sea un MongoDB ObjectId
  ],
  validarResults,  // Middleware para validar los resultados de las validaciones
  deletepagos  // El controlador que maneja la eliminación
);


// ✅ CREAR PAGO
router.post(
  "/",
  [
    check("usuario_id").isMongoId(),
    check("monto").isDecimal({ decimal_digits: "0,2" }),
    check("fecha_pago").isISO8601(),
    check("fecha_vencimiento").isISO8601(),
    check("metodo").isIn(["tarjeta", "efectivo", "transferencia"])
  ],
  validarResults,
  postpagos
)

// ✅ LISTAR PAGOS (por usuario)
router.get(
  "/usuario/:usuario_id",
  [
    check("usuario_id").isMongoId()
  ],
  validarResults,
  getpagos
)

// ✅ ACTUALIZAR PAGO
router.put(
  "/:id",
  [
    check("id").isMongoId(),
    check("monto").optional().isDecimal({ decimal_digits: "0,2" }),
    check("fecha_pago").optional().isISO8601(),
    check("fecha_vencimiento").optional().isISO8601(),
    check("metodo").optional().isIn(["tarjeta", "efectivo", "transferencia"])
  ],
  validarResults,
  putpagos
)

export default router
