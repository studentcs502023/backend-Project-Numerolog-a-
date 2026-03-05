
import mongoose from "mongoose";

export const conectarMongo = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("BD conectada a MongoDB Atlas"))
    .catch(err => console.error(err));
};