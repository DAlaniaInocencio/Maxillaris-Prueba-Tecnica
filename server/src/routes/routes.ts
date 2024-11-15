import { Router } from "express";
import usersRoutes from "../users/users.routes";
import filesRoutes from "../files/files.routes";
import { verifyToken } from "../middlewares/auth.middleware";

const router: Router = Router();

router.use("/users", usersRoutes);
router.use("/files",verifyToken ,filesRoutes);

export default router;
