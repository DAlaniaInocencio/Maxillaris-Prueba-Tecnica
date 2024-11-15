import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export interface RequestWithUser extends Request {
  user?: any |string | JwtPayload;
}

export const verifyToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"];

  if (!token) {
     res.status(403).json({ message: "No token provided" });
  }

  try {
    if (token) {
      const decoded = jwt.verify(
        token.split(" ")[1],
        process.env.JWT_SECRET as string
      );
      req.user = { id: (decoded as JwtPayload).id };

      next();
    } else {
      res.status(403).json({ message: "No token provided" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }


};

