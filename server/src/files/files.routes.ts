// src/users/routes/user.routes.ts
import { Router } from "express";
import * as fileschanges from "./files.controller";
import { upload } from "../config/multer.config"; // Importa el middleware de multer
import {postFile} from "./files.controller";


const filesRoutes= Router()

filesRoutes.get("/" ,fileschanges.getAll); 
filesRoutes.post("/", upload.single("file"), postFile);
filesRoutes.put("/:id", upload.single("file"), fileschanges.putFileStats); // Permite subir un nuevo archivo
filesRoutes.delete("/:id", fileschanges.removeFileStats);

filesRoutes.get("/stats", fileschanges.getFileStats); // Obtener peso total y cantidad total


export default filesRoutes;
