import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";
import { CartItemEntity } from "../../carts-item/entities/carts-item.entity";

@Entity("carts")
export class CartEntity {
  @PrimaryGeneratedColumn("increment")
  cartId: number;

  @Column({ type: "int", nullable: true })
  userId: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  // Relación OneToMany con CartItemEntity
  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart)
  cartItems: CartItemEntity[];

  @ManyToOne(() => UserEntity, (user) => user.carts, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: "category_id" })
  user: UserEntity;
}
