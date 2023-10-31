import User from "../models/users.models.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { nombres, apellidos, email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({
      nombres,
      apellidos,
      email,
      password: passwordHash,
    });

    const responseUserSaved = await newUser.save();

    const token = await createAccesToken({ id: responseUserSaved.id });
    res.cookie("token", token);

    res.send({
      nombres: responseUserSaved.nombres,
      apellidos: responseUserSaved.apellidos,
      email: responseUserSaved.email,
      createdAt: responseUserSaved.createdAt,
      updatedAt: responseUserSaved.updatedAt,
    });
  } catch (err) {
    res.send("An error occurred while registering");
  }
};

export const login = (req, res) => {};
