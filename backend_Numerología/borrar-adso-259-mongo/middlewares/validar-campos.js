
// import { validationResult } from 'express-validator';

// export const validarCampos = (req, res, next) => {
//  // validationResult extrae los errores acumulados por check()
//  const errors = validationResult(req);

//  if (!errors.isEmpty()) {
//  return res.status(400).json(errors);
//  }
//  next(); // Si no hay errores, sigue al controlador
// }

// export default


// middlewares/validar-campos.js
import { validationResult } from 'express-validator';


import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {
  // validationResult extrae los errores acumulados por check()
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next(); // Si no hay errores, sigue al controlador
};

export default validarCampos; // Exportación predeterminada (default)

