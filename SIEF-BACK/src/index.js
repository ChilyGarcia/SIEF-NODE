import app from "./app.js";
//import { connDB } from "./db.js";
import { PORT } from "./config.js";

import { conexion } from "./db.js";

conexion.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Database connection established");
  }
});



app.listen(PORT);

console.log("Server is running...");
