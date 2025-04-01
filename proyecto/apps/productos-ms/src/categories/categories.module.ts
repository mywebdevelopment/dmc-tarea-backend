import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriasController } from "./categorias.controller";
import { CategoryEntity } from "./entities/category.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoriasController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
