import { Router } from "express";
import { AuthCtrl } from "./auth.controller";

const authCtrl = new AuthCtrl();

const authRoutes: Router = Router();

authRoutes.post("/login", authCtrl.login);

export default authRoutes;
