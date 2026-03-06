import mongoose from "mongoose";

const usuario = new mongoose.Schema({
    nombre:{type:String,require:true},
    fechanacimiento:{type:Date, default:Date.now},
    email:{type:String,unique:true},
    password:{ type: String, required: true },
    role:{type:String, enum:[0,1]},//admin, user 
    estado:{type:Number,default:1}//0 inactivo   1 activo
});

// const usuario = new mongoose.Schema({
//   nombre: String,
//   edad: Number,
//   fechanacimiento: Date,
//   email: { type: String, unique: true },
//   password: String,
//   estado:{type:Number,default:1}//0 inactivo   1 activo
// });
export default mongoose.model("Usuario",usuario)