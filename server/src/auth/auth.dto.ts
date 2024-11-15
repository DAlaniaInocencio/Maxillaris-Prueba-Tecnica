import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
  @IsEmail({}, { message: "El email no es válido" })
  @IsString()
  email!: string;

  @IsString()
  @IsNotEmpty({ message: "El password es obligatorio" })
  password!: string;
}
