import { Controller, Param } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { CategoryDto } from "./dto/category.dto";

@Controller()
export class CategoriasController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @MessagePattern("createCategoria")
  async findAll(): Promise<CategoryDto[]> {
    return this.categoriesService.findAll();
  }

  @MessagePattern("createCategoria")
  async findOne(@Payload("id") id: number): Promise<CategoryDto> {
    return this.categoriesService.findOne(id);
  }

  @MessagePattern("createCategoria")
  async create(
    @Payload() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDto> {
    return this.categoriesService.create(createCategoryDto);
  }

  @MessagePattern("createCategoria")
  async update(
    @Param("id") id: number,
    @Payload() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @MessagePattern("createCategoria")
  async delete(@Payload("id") id: number): Promise<void> {
    return this.categoriesService.delete(id);
  }
}
