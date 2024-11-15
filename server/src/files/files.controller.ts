import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { File } from "./entity/files.entity";
import * as fs from 'fs';
import * as path from 'path';
import { User } from "../users/entity/users.entity";
import { JwtPayload } from "jsonwebtoken";
// import { RequestWithUser } from "../auth/auth.middleware";


interface RequestWithUser extends Request {
  user?: any |string | JwtPayload;
}


// Función para obtener el peso total y la cantidad total de archivos
export const getFileStats = async (req: Request, res: Response) => {
  try {
    const archivos = await AppDataSource.getRepository(File).find();

    const pesoTotal = archivos.reduce((acc, archivo) => acc + archivo.peso, 0);
    const cantidadTotal = archivos.reduce(
      (acc, archivo) => acc + archivo.cantidad,
      0
    );

    res.json({ pesoTotal, cantidadTotal });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al calcular las estadísticas.", error });
  }
};

// Función para subir un archivo
export const postFile = async (req: RequestWithUser, res: Response): Promise<void> => {
  try {
    // Verificar si se ha subido un archivo
    if (!req.file) {
      res.status(400).json({ message: "No se ha subido ningún archivo." });
      return;
    }

    const peso = req.file.size;
    const tipo = req.file.mimetype;
    const cantidad = 1;

     // Obtener el usuario autenticado a partir del req.user.id
     const user = await AppDataSource.getRepository(User).findOneBy({ id: req.user.id });
     if (!user) {
       res.status(404).json({ message: "Usuario no encontrado." });
       return;
     }

    const nuevoArchivo = new File();
    nuevoArchivo.peso = peso;
    nuevoArchivo.tipo = tipo;
    nuevoArchivo.cantidad = cantidad;
    nuevoArchivo.user = user; // Asocia el archivo con el usuario autenticado

    const archivoGuardado = await AppDataSource.getRepository(File).save(
      nuevoArchivo
    );

    res.status(201).json(
      archivoGuardado
    );
  } catch (error) {
    res.status(500).json({ message: "Error al subir el archivo.", error });
  }
};

export const getAll = async (req: RequestWithUser, res: Response): Promise<void> => {
  try {
        // Obtener el ID del usuario autenticado desde req.user.id
    const userId = req.user?.id;

    // Verificar si el usuario está autenticado
    if (!userId) {
      res.status(403).json({ message: "Usuario no autenticado." });
      return;
    }


    const archivos = await AppDataSource.getRepository(File).find(
      {
        where: { user: { id: userId } }, // Filtrar por el ID del usuario autenticado
        select: ["id", "peso", "tipo", "cantidad"], // Seleccionar solo los campos que deseas devolver
      }
    );

    res.status(200).json(archivos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los archivos.", error });
  }
};

// Función para actualizar un archivo
export const putFileStats = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const userId = req.user?.id;


    // Buscar el archivo existente por su ID y asegurarse de que pertenece al usuario autenticado
    const archivoExistente = await AppDataSource.getRepository(File).findOne({
      where: { id: parseInt(id), user: { id: userId } },
    });

    if (!archivoExistente) {
      res.status(404).json({ message: "Archivo no encontrado." });
      return;
    }

    // Verificar si se ha subido un nuevo archivo
    if (!req.file) {
      res.status(400).json({ message: "No se ha subido ningún archivo." });
      return;
    }

    // Actualizar los datos del archivo con la nueva información
    archivoExistente.peso = req.file.size;
    archivoExistente.tipo = req.file.mimetype;
    archivoExistente.cantidad = 1; // Suponiendo que siempre será un archivo a la vez

    const archivoActualizado = await AppDataSource.getRepository(File).save(
      archivoExistente
    );

    res.status(200).json(archivoActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el archivo.", error });
  }
};

export const removeFileStats = async (req: RequestWithUser, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const userId = req.user?.id;

    // Verificar si el usuario está autenticado
    if (!userId) {
      res.status(403).json({ message: "Usuario no autenticado." });
      return;
    }

    // Buscar el archivo por su ID y asegurarse de que pertenece al usuario autenticado
    const archivo = await AppDataSource.getRepository(File).findOne({
      where: { id: parseInt(id), user: { id: userId } },
    });

    if (!archivo) {
      res.status(404).json({ message: "Archivo no encontrado o no pertenece al usuario" });
      return;
    }

    const filePath = path.join(__dirname, "../../uploads", `${id}-${archivo.tipo}`); // Ruta al archivo físico
    
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error al eliminar el archivo físicamente:", err);
      }
    });

    await AppDataSource.getRepository(File).delete({ id: parseInt(id) });

    res.status(200).json({ message: "Archivo eliminado exitosamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el archivo.", error });
  }
};