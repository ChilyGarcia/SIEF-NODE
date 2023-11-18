import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import infoRoutes from "./routes/info.routes.js"

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(authRoutes);
app.use(infoRoutes);


export default app;
