import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";
import { conexion } from "../db.js";
import util from "util";
const queryAsync = util.promisify(conexion.query).bind(conexion);

export const register = async (req, res) => {
  const { nombres, apellidos, email, password, role } = req.body;

  try {
    const selectResults = await queryAsync(
      "SELECT * FROM usuario WHERE email = ?",
      [email]
    );

    if (selectResults.length > 0) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const nuevoUsuario = {
      nombres,
      apellidos,
      email,
      password: hashedPassword,
      role,
    };

    const insertResults = await queryAsync(
      "INSERT INTO usuario SET ?",
      nuevoUsuario
    );

    res.status(200).json({
      nombres,
      apellidos,
      email,
      role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el registro de usuario" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const selectResults = await queryAsync(
      "SELECT * FROM usuario WHERE email = ?",
      [email]
    );

    if (selectResults.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const userFound = selectResults[0];

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = await createAccesToken({ id: userFound.id });

    res.cookie("token", token);

    res.status(200).json({
      id: userFound.id,
      email: userFound.email,
      role: userFound.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el inicio de sesión" });
  }
};
