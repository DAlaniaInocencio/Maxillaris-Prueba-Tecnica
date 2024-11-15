import { AppDataSource } from "../config/database";
import { User } from "../users/entity/users.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginDTO } from "./auth.dto";
import { Repository } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export class AuthService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  public async login(loginData: LoginDTO): Promise<string> {
    const { email, password } = loginData;
    console.log(loginData);
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return token;
  }
}
