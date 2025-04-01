import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  parent_category_id?: number;
}
