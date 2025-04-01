import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { Repository } from "typeorm";
import { plainToInstance } from "class-transformer";
import { CategoryDto } from "./dto/category.dto";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAll(): Promise<CategoryDto[]> {
    const category = await this.categoryRepository.find({
      relations: ["parentCategory"],
    });
    return plainToInstance(CategoryDto, category, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: number): Promise<CategoryDto> {
    const category = await this.categoryRepository.findOne({
      where: { categoryId: id },
      relations: ["parentCategory"],
    });
    return plainToInstance(CategoryDto, category, {
      excludeExtraneousValues: true,
    });
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    await this.categoryRepository.update(id, updateCategoryDto);
    const category = await this.findOne(id);
    return plainToInstance(CategoryDto, category, {
      excludeExtraneousValues: true,
    });
  }

  async delete(category_id: number): Promise<void> {
    await this.categoryRepository.delete(category_id);
  }
}
