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

    if (responseUserSaved) {
      res.send({
        nombres: responseUserSaved.nombres,
        apellidos: responseUserSaved.apellidos,
        email: responseUserSaved.email,
        createdAt: responseUserSaved.createdAt,
        updatedAt: responseUserSaved.updatedAt,
      });
    } else {
      res.send("An error ocurred while saving data in DB");
    }
  } catch (err) {
    res.send("An error occurred while registering");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(404).json({ message: "Password is not correct" });

    const token = await createAccesToken({ id: userFound.id });

    res.cookie("token", token);

    res.status(200).json({
      id: userFound.id,
      email: userFound.email,
      username: userFound.username,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
      token: token
    });
  } catch (error) {
    res.status(504).json({ message: error.message });
  }
};
