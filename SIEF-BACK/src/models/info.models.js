import mongoose from "mongoose";

const infoSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    trim: true,
  },
  programa: {
    type: String,
    required: true,
    trim: true,
  },
  periodo: {
    type: String,
    required: true,
    trim: true,
  },
  inscritos: {
    type: String,
    required: true,
    trim: true,
  },
  admitidos: {
    type: String,
    required: true,
    trim: true,
  },
  matriculados: { 
    type: String,
    required: true,
    trim: true,
  },
  graduados: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model("Informacion", infoSchema);
