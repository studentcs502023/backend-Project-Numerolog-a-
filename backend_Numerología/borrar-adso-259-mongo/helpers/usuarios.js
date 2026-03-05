import Usuario from "../models/usuario.js"


export const validarExisteUsuario = async (id) => {
    const existeId = await Usuario.findById(id);
    if (!existeId) {
        throw new Error(`El usuario ${id} no esta registrado`);
    }
}

export const validarEmail = async (correo) => {
  const existeEmail = await Usuario.findOne({ email: correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya está registrado`);
  }
};


