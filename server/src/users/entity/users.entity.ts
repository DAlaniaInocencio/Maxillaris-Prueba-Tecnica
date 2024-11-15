import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { File } from "../../files/entity/files.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => File, (file) => file.user, { onDelete: "CASCADE" })
  files!: File[];

}
