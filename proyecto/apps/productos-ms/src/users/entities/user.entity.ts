import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CartEntity } from "../../carts/entities/cart.entity";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("increment")
  userId: number;

  @Column({ type: "varchar", length: 255, unique: true })
  username: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "varchar", length: 255 })
  firstName: string;

  @Column({ type: "varchar", length: 255 })
  lastName: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  gender: string;

  @Column({ type: "date", nullable: true })
  birthDate: Date;

  @Column({ type: "varchar", length: 255, nullable: true })
  address: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  phoneNumber: string;

  @Column({ type: "varchar", length: 50, default: "customer" })
  role: string;

  @Column({ type: "varchar", length: 50, default: "active" })
  status: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @OneToMany(() => CartEntity, (cart) => cart.user)
  carts: CartEntity[];
}
