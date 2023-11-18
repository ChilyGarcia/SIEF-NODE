import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";

export const authorizationToken = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    // Hay que validar si el token que se recibió es un token que generé yo
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Invalid token" });
  
      req.user = decoded;
  
      next();
    });
};
