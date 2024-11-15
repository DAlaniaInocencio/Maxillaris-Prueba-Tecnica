import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from "typeorm";
import { User } from "../../users/entity/users.entity";

@Entity("files")
export class File {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  peso!: number;

  @Column()
  tipo!: string;

  @Column()
  cantidad!: number;

  // (Muchos archivos pertenecen a un usuario)
  @ManyToOne(() => User, (user) => user.files, { onDelete: "CASCADE" })
  user!: User;
}
