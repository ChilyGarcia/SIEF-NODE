import app from "./app.js";
import { connDB } from "./db.js";
import { PORT } from "./config.js";

connDB();
app.listen(PORT)

console.log("Server is running...");