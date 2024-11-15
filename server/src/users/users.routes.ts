import { Router } from "express";
import * as userschanges from "./users.controller";

const usersRoutes= Router()

usersRoutes.get("/", userschanges.getUsers);
usersRoutes.post("/", userschanges.createUser);

export default usersRoutes;
