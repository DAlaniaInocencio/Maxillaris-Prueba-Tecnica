import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./auth.dto";

const authService = new AuthService();

export class AuthCtrl {
  public async login(req: Request, res: Response): Promise<void> {
    const loginData: LoginDTO = req.body;
    console.log("puevb");
    try {
      const token = await authService.login(loginData);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ message: "Invalid credentials" });
    }
  }
}
