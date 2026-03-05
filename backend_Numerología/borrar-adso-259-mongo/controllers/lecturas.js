import axios from "axios";

import lecturas from "../models/lecturas.js";
import Usuario from "../models/usuario.js";

const lecturasController = {

  /* ===========================
     LECTURA PRINCIPAL
  ============================ */
  generarLecturaNumerologica: async (req, res) => {
    const { usuario_id } = req.params;  // Obtenemos el ID del usuario desde los parámetros de la URL

    try {
      // 1. Verificar si ya existe lectura principal
      const existePrincipal = await lecturas.findOne({
        userid: usuario_id,
        tipo_lectura: "principal"
      });

      if (existePrincipal) {
        return res.status(400).json({ msg: "Ya existe una lectura principal para este usuario." });
      }

      // 2. Obtener usuario
      const usuario = await Usuario.findById(usuario_id).select("fechanacimiento");
      if (!usuario || !usuario.fechanacimiento) {
        return res.status(400).json({ msg: "Usuario sin fecha de nacimiento." });
      }

      const fechaNacimiento = new Date(usuario.fechanacimiento).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });

      const keys = [
        process.env.API_KEY,
        process.env.API_KEY2,
        process.env.API_KEY3
      ];

      const MODEL = "gemini-2.0-flash";
      let respuesta = null;

      // 3. Intentar con múltiples API keys
      for (const key of keys) {
        try {
          const contenido = [{
            role: "user",
            parts: [{
              text: `Eres un experto en numerología moderna. 
              Analiza la fecha ${fechaNacimiento} y haz una lectura mística, clara y breve.`
            }]
          }];

          const resGemini = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`,
            { contents: contenido },
            { headers: { "Content-Type": "application/json" } }
          );

          respuesta = resGemini.data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (respuesta) break;

        } catch (err) {
          console.warn("⚠️ Falló API Key, probando siguiente...");
        }
      }

      if (!respuesta) {
        return res.status(500).json({ msg: "No se obtuvo respuesta de Gemini." });
      }

      // 4. Guardar lectura
      const nuevaLectura = await lecturas.create({
        userid: usuario_id,
        tipo_lectura: "principal",
        contenido: respuesta
      });

      return res.status(201).json({ msg: "Lectura principal guardada.", nuevaLectura });

    } catch (err) {
      console.error("❌ Error en lectura principal:", err);
      return res.status(500).json({ error: err.message });
    }
  },

  /* ===========================
     LECTURA DIARIA
  ============================ */
  generarLecturaDiaria: async (req, res) => {
    const { usuario_id } = req.params;

    try {
      // 1. Obtener usuario
      const usuario = await Usuario.findById(usuario_id).select("estado fechanacimiento");

      if (!usuario) {
        return res.status(404).json({ msg: "Usuario no encontrado." });
      }

      if (usuario.estado !== "activo") {
        return res.status(400).json({ msg: "Usuario inactivo." });
      }

      // 2. Verificar lectura diaria hoy
      const inicioHoy = new Date();
      inicioHoy.setHours(0, 0, 0, 0);

      const finHoy = new Date();
      finHoy.setHours(23, 59, 59, 999);

      const lecturaHoy = await lecturas.findOne({
        userid: usuario_id,
        tipo_lectura: "diaria",
        fecha_lectura: { $gte: inicioHoy, $lte: finHoy }
      });

      if (lecturaHoy) {
        return res.status(400).json({ msg: "Ya existe lectura diaria hoy." });
      }

      const fechaNacimiento = new Date(usuario.fechanacimiento).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });

      const keys = [
        process.env.API_KEY,
        process.env.API_KEY2,
        process.env.API_KEY3
      ];

      const MODEL = "gemini-2.0-flash";
      let respuesta = null;

      // 3. Intentar con múltiples API keys
      for (const key of keys) {
        try {
          const contenido = [{
            role: "user",
            parts: [{
              text: `Eres un experto en numerología pitagórica diaria.
              Analiza la energía del día según la fecha ${fechaNacimiento}.
              Indica el número del día y su influencia emocional.
              Máx 4 frases, tono místico e inspirador.`
            }]
          }];

          const resGemini = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`,
            { contents: contenido },
            { headers: { "Content-Type": "application/json" } }
          );

          respuesta = resGemini.data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (respuesta) break;

        } catch (err) {
          console.warn("⚠️ Falló API Key, probando otra...");
        }
      }

      if (!respuesta) {
        return res.status(500).json({ msg: "Sin respuesta de Gemini." });
      }

      // 4. Guardar lectura
      const nuevaLectura = await lecturas.create({
        userid: usuario_id,
        tipo_lectura: "diaria",
        contenido: respuesta
      });

      return res.status(201).json({ msg: "Lectura diaria guardada.", nuevaLectura });

    } catch (err) {
      console.error("❌ Error en lectura diaria:", err);
      return res.status(500).json({ error: err.message });
    }
  },

  /* ===========================
     CONSULTAS
  ============================ */
  obtenerLecturasPorUsuario: async (req, res) => {
    const { usuario_id } = req.params;

    try {
      const lecturasUsuario = await lecturas.find({ userid: usuario_id }).sort({ fecha_lectura: -1 });
      return res.status(200).json(lecturasUsuario);
    } catch (error) {
      console.error("❌ Error al obtener las lecturas:", error);
      return res.status(500).json({ error: error.message });
    }
  },

  // obtenerLecturaPorId: async (req, res) => {
  //   const { id } = req.params;

  //   try {
  //     const lectura = await lecturas.findById(id);
  //     if (!lectura) {
  //       return res.status(404).json({ msg: "Lectura no encontrada" });
  //     }
  //     return res.status(200).json(lectura);
  //   } catch (error) {
  //     console.error("❌ Error al obtener la lectura:", error);
  //     return res.status(500).json({ error: error.message });
  //   }
  // }

};

export default lecturasController;

import Lectura from "../models/lecturas.js";
import Usuario from "../models/usuario.js";
import Pagos from "../models/modelspagos.js";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

export const postLectura = async (req, res) => {
  try {
    const { usuario_id, tipo } = req.body;

    /* 1️⃣ Validar usuario */
    const usuario = await Usuario.findById(usuario_id);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    /* 2️⃣ Validar suscripción vigente */
    const hoy = new Date();

    const pagoVigente = await Pagos.findOne({
      usuario_id,
      fecha_vencimiento: { $gte: hoy }
    });

    if (!pagoVigente) {
      return res.status(403).json({
        msg: "Suscripción vencida o inexistente"
      });
    }

    /* 3️⃣ Crear prompt */
    const prompt = `
Genera una lectura numerológica ${tipo}.
Fecha de nacimiento del usuario: ${usuario.fechanacimiento}.
Lenguaje espiritual, claro y positivo.
No menciones dinero, pagos ni suscripciones.
    `;

    /* 4️⃣ Llamada a Gemini 3 (AXIOS) */
    const response = await axios.post(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    const contenido =
      response.data.candidates[0].content.parts[0].text;

    /* 5️⃣ Guardar lectura */
    const lectura = await Lectura.create({
      usuario_id,
      tipo,
      contenido
    });

    /* 6️⃣ Respuesta */
    res.status(201).json({
      msg: "Lectura generada correctamente",
      lectura
    });

  } catch (error) {
    console.error(
      "Error Gemini:",
      error.response?.data || error.message
    );
    res.status(500).json({
      msg: "Error al generar la lectura"
    });
  }
};
