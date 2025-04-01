import { Expose, Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class CategoryDto {
  @Expose()
  categoryId: number;

  @IsOptional()
  @Expose()
  name?: string;

  @IsOptional()
  @Expose()
  description?: string;

  @IsOptional()
  @Expose()
  @Type(() => CategoryDto)
  parentCategory?: CategoryDto;
}
