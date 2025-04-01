import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { CategoryEntity } from "../../categories/entities/category.entity";
import { CartItemEntity } from "../../carts-item/entities/carts-item.entity";
@Entity({ name: "products", schema: "public" })
export class ProductEntity {
  @PrimaryGeneratedColumn({ name: "product_id" })
  productId: number;

  @Column({ name: "name", type: "varchar", length: 255 })
  name: string;

  @Column({ name: "description", type: "text", nullable: true })
  description: string;

  @Column({ name: "price", type: "numeric", precision: 10, scale: 2 })
  price: number;

  @Column({ name: "is_on_sale", type: "boolean", default: false })
  isOnSale: boolean;

  @Column({
    name: "percent_on_sale",
    type: "numeric",
    precision: 10,
    scale: 2,
    default: 0,
  })
  percentOnSale: number;

  @Column({
    name: "discount_price",
    type: "numeric",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  discountPrice: number;

  @Column({ name: "stock_quantity", type: "integer", default: 0 })
  stockQuantity: number;

  @Column({ name: "brand", type: "varchar", length: 255, nullable: true })
  brand: string;

  @Column({ name: "image_url", type: "varchar", length: 255, nullable: true })
  imageUrl: string;

  @Column({
    name: "weight",
    type: "numeric",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  weight: number;

  @Column({ name: "dimensions", type: "varchar", length: 255, nullable: true })
  dimensions: string;

  @Column({ name: "sku", type: "varchar", length: 100, unique: true })
  sku: string;

  @Column({ name: "status", type: "varchar", length: 50, default: "active" })
  status: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: "category_id" })
  category: CategoryEntity;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.product)
  cartItems: CartItemEntity[];
}
/*
  @ManyToOne(() => CategoryEntity, (category) => category.parent, {
    eager: true,
  })
  @JoinColumn({ name: "category_id", referencedColumnName: "category_id" })
  category: CategoryEntity;
*/
