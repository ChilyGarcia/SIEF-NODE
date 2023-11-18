import mongoose from "mongoose";

const auditsSchema = mongoose.Schema({
  accion: {
    type: String,
    required: true,
    trim: true,
  },
  programa: {
    type: String,
    required: true,
    trim: true,
  },
  fecha: {
    type: String,
    required: true,
    trim: true,
  },
  usuario: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model("Audits", auditsSchema);
