import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductEntity } from "./entities/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "../categories/entities/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, CategoryEntity])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
