import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ProductEntity } from "../../products/entities/product.entity";

@Entity({ name: "categories", schema: "public" })
export class CategoryEntity {
  @PrimaryGeneratedColumn({ name: "category_id" })
  categoryId: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.subCategories, {
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: "parent_category_id" })
  parentCategory: CategoryEntity;

  @OneToMany(() => CategoryEntity, (category) => category.parentCategory)
  subCategories: CategoryEntity[];

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
