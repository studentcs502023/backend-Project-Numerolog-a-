import modelspagos from "../models/modelspagos.js"

const postpagos = async (req, res) => {
  try {
    const {
      usuario_id,
      monto,
      fecha_pago,
      metodo
    } = req.body;

    // 1. Calcular fecha de vencimiento (+1 mes)
    const fechaPago = new Date(fecha_pago);
    const fechaVencimiento = new Date(fechaPago);
    fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 1);

    const pago = await modelspagos.create({
      usuario_id,
      monto,
      fecha_pago: fechaPago,
      fecha_vencimiento: fechaVencimiento,
      metodo
    });

    res.status(201).json({
      msg: "Suscripción activada por 1 mes",
      pago
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const postpagos = async (req, res) => {
//   try {
//     const { usuario_id, monto, fecha_pago,fecha_vencimiento,metodo } = req.body

//     const pago = await modelspagos.create({
//       usuario_id,
//       monto,
//       fecha_pago,
// fecha_vencimiento,
// metodo
//     })

//     res.status(201).json({
//       msg: "Pago registrado correctamente",
//       pago
//     })
//   } catch (error) {
//     res.status(400).json({ error: error.message })
//   }
// }

const deletepagos = async (req, res) => {
  try {
    // Extraemos el `usuario_id` de los parámetros de la URL
    const { usuario_id } = req.params;

    // Intentamos eliminar el pago del modelo usando el ID
    const pago = await modelspagos.findOneAndDelete({ usuario_id });

    if (!pago) {
      return res.status(404).json({ msg: "Pago no encontrado" });
    }

    res.json({ msg: "Pago eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getpagos = async (req, res) => {
  try {
    const { usuarioid } = req.params
    const pagos = await modelspagos.find({ usuario_id: usuarioid })
    res.json(pagos)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


const putpagos = async (req, res) => {
  try {
    const { id } = req.params;  // Extraemos el ID de la URL
    const { monto, fecha_pago, fecha_vencimiento, metodo } = req.body;  // Extraemos los datos del cuerpo

    // Verificamos si el pago existe
    const pago = await modelspagos.findById(id);
    if (!pago) {
      return res.status(404).json({ msg: "Pago no encontrado" });
    }

    // Actualizamos los campos proporcionados
    if (monto) pago.monto = monto;
    if (fecha_pago) pago.fecha_pago = fecha_pago;
    if (fecha_vencimiento) pago.fecha_vencimiento = fecha_vencimiento;
    if (metodo) pago.metodo = metodo;

    // Guardamos el pago actualizado
    await pago.save();

    res.json({ msg: "Pago actualizado correctamente", pago });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { postpagos, deletepagos, getpagos,putpagos }
