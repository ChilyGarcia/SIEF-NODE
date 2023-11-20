/*

import mongoose from "mongoose";

export const connDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/sief-backend");
    console.log("Database connection established");
  } catch (e) {
    console.log("Database connection error: " + e.message);
  }
};


*/
import mysql from "mysql";

export const conexion = mysql.createConnection({
  host: "localhost",
  database: "sief-node",
  user: "root",
  password: "",
});
