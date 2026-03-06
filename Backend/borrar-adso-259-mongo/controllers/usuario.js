import Usuario from "../models/usuario.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


const getUsuario= async (req,res)=>{
    try {
        const usuarios= await Usuario.find()
        res.json({usuarios})
    } catch (error) {
        res.status(400).json({error})
    }
}

const getUsuarioEmail= async (req,res)=>{
    try {
        const {email}=req.query
        const usuarios= await Usuario.find({email})
        res.json({usuarios})
    } catch (error) {
        res.status(400).json({error})
    }
}



const postUsuario = async (req, res) => {
  try {
    const { nombre,  fechanacimiento, email, password,role } = req.body;

    // 1️⃣ Crear instancia del usuario
    const usuario = new Usuario({
      nombre,
      fechanacimiento,
      email,
      role
      // No ponemos password aún
    });

    // 2️⃣ Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);

    // 3️⃣ Guardar en DB
    await usuario.save();

    // 4️⃣ Responder sin devolver password
    const { password: _, ...usuarioSinPassword } = usuario.toObject();

    res.json({
      msg: "Usuario creado correctamente",
      usuario: usuarioSinPassword
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// const postUsuario=async(req,res)=>{
//     try {
//          const {nombre,edad,fechanacimiento,email,password}=req.body

//         const usuario= new Usuario({
//             nombre,edad,fechanacimiento,email,password
//         })

//         await usuario.save()

//          res.json({usuario,msg:"Usuario creado correctamente"})

//     } catch (error) {
//          res.status(400).json({error})
//     }
// }
// const postUsuario = async (req, res) => {
//   try {
//     const { nombre, edad, fechanacimiento, email, password, estado } = req.body;

//     const usuario = new Usuario({
//       nombre,
//       edad,
//       fechanacimiento,
//       email,
//       password,
//       estado // si no viene, usa default: 1
//     });

//     // 🔐 Encriptar contraseña
//     const salt = bcrypt.genSaltSync(10);
//     usuario.password = bcrypt.hashSync(password, salt);

//     await usuario.save();

//     res.json({
//       msg: "Usuario creado correctamente",
//       usuario
//     });

//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };


const putUsuario=async(req,res)=>{
    try {
        const {nombre}=req.body
        const {id}=req.params

        await Usuario.findByIdAndUpdate(id,{nombre})

        res.json({msg:"Usuario modificado correctamente"})
    } catch (error) {
          res.status(400).json({error})
    }
    

}

const putUsuarioActivar=async(req,res)=>{
    try {
        const {id}=req.params

        await Usuario.findByIdAndUpdate(id,{estado:1})

        res.json({msg:"Usuario activado correctamente"})
    } catch (error) {
          res.status(400).json({error})
    }
    

}

const putUsuarioInactivar=async(req,res)=>{
    try {
        const {id}=req.params

        await Usuario.findByIdAndUpdate(id,{estado:0})

        res.json({msg:"Usuario inactivado correctamente"})
    } catch (error) {
          res.status(400).json({error})
    }
    

}

const deleteUsuario=async(req,res)=>{
    try {
        const {id}=req.params

        await Usuario.findByIdAndDelete(id)

        res.json({msg:"Usuario eliminado correctamente"})
    } catch (error) {
          res.status(400).json({error})
    }
    

}
const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body

    const usuario = await Usuario.findOne({ email }).select("+password")
    if (!usuario) return res.status(401).json({ msg: "Credenciales incorrectas" })

    const esCorrecto = await bcrypt.compare(password, usuario.password)
    if (!esCorrecto) return res.status(401).json({ msg: "Credenciales incorrectas" })

    const token = jwt.sign(
      { uid: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    const { password: _, ...usuarioSinPassword } = usuario.toObject()

    res.json({ token, usuario: usuarioSinPassword })

  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor", error: error.message })
  }
}

// const loginUsuario = async (req, res) => {
//   try {

//     const { email, password } = req.body

//     const usuario = await Usuario.findOne({ email })
//     if (!usuario) {
//       return res.status(401).json({ msg: "Credenciales incorrectas" })
//     }

//     const esCorrecto = await bcrypt.compare(password, usuario.password)
//     if (!esCorrecto) {
//       return res.status(401).json({ msg: "Credenciales incorrectas" })
//     }

//     const token = jwt.sign(
//       { uid: usuario._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     )

//     const { password: _, ...usuarioSinPassword } = usuario.toObject()

//     res.json({
//       token,
//       usuario: usuarioSinPassword
//     })

//   } catch (error) {
//     res.status(500).json({ msg: "Error en el servidor" })
//   }
// }

export {getUsuario,postUsuario,putUsuario,putUsuarioActivar,putUsuarioInactivar,deleteUsuario, getUsuarioEmail,loginUsuario}