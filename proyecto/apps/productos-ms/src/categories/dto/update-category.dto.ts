import { IsOptional } from "class-validator";

export class UpdateCategoryDto {
  categoryId: number;

  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  parent_category_id?: number;
}
