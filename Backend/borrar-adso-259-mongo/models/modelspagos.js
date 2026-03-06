import mongoose from "mongoose"

const pagosSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },

  monto: {
    type: Number,
    required: true,
    min: 0
  },

  fecha_pago: {
    type: Date,
    required: true
  },

  fecha_vencimiento: {
    type: Date,
    required: true
  },

  metodo: {
    type: String,
    enum: ["tarjeta", "efectivo", "transferencia"],
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model("Pagos", pagosSchema)
