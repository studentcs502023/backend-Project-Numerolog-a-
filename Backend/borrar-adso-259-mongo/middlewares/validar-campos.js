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

export const validarCampos = (req, res, next) => {
  // validationResult extrae los errores acumulados por check()
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next(); // Si no hay errores, sigue al controlador
};

// export const validateRole = (req, res, next) => {

// let roles = roles(req) 
//    roles = { admin: 0, user: 1 };
  
//   const { role, num } = req.body; // extraemos role y num del body

//   // Chequeo si role existe y es válido
//   if (!role || !(role in roles)) {
//     return res.status(400).json({ error: 'Role inválido' });
//   }

//   // Chequeo que num coincida con el role
//   if (roles[role] !== num) {
//     return res.status(400).json({ error: 'El número no coincide con el role' });
//   }

//   // Todo bien, pasar al siguiente middleware
//   next();
// };

export default validarCampos; // Exportación predeterminada (default)
