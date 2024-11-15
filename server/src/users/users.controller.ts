import { Request, Response } from "express";
import { AppDataSource } from "../config/database";  // Importamos la conexión
import { User } from "./entity/users.entity";  // Importamos la entidad User

import bcrypt from 'bcrypt';


export const getUsers = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();  // Obtiene todos los usuarios
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios.", error });
  }
};


export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;
  
      const userRepository = AppDataSource.getRepository(User);
      const existingUser = await userRepository.findOne({ where: [{ email }, { name }] });
      if (existingUser) {
        res.status(409).json({ message: "El usuario con este nombre o correo ya existe." });
        return;
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = userRepository.create({
        name,
        email,
        password: hashedPassword,
      });
      await userRepository.save(newUser);
  
      // Omitir la contraseña antes de enviar la respuesta
      const { password: _, ...userWithoutPassword } = newUser;
  
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Error al crear el usuario.", error });
    }
  };