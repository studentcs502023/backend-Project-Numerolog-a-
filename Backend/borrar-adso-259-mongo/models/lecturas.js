import mongoose from "mongoose";

const lectura = new mongoose.Schema({
userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
    fecha_lectura:{type:Date,default:Date.now},
    tipo_lectura:{type:String,requireD:true},
    contenido:{type:String, required:true}
});

export default mongoose.model("Lectura",lectura)


