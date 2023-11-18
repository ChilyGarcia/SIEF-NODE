import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nombres: {
    type: String,
    required: true,
    trim: true,
  },
  apellidos: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "director"], // Puedes definir los roles que necesites
    default: "user", // El valor por defecto será "user" si no se proporciona uno
  },
}, {versionKey: false});

export default mongoose.model("User", userSchema);
