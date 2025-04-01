import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CartEntity } from "../../carts/entities/cart.entity";
import { ProductEntity } from "../../products/entities/product.entity";

@Entity("cart_items")
export class CartItemEntity {
  @PrimaryGeneratedColumn("increment")
  cartItemId: number;

  @ManyToOne(() => CartEntity, (cart) => cart.cartItems, { nullable: false })
  @JoinColumn({ name: "cart_id" })
  cart: CartEntity; // Relación con CartEntity

  @ManyToOne(() => ProductEntity, (product) => product.cartItems, {
    nullable: false,
  })
  @JoinColumn({ name: "product_id" })
  product: ProductEntity; // Relación con ProductEntity

  @Column({ type: "int" })
  quantity: number; // Cantidad del producto en el carrito

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  addedAt: Date; // Fecha de adición del producto al carrito
}
