import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsPositive } from "class-validator";
import { CategoryDto } from "../../categories/dto/category.dto";

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsNotEmpty()
  isOnSale: boolean;

  @IsOptional()
  @Type(() => Number)
  percentOnSale: number;

  @IsOptional()
  @Type(() => Number)
  discountPrice: number;

  @IsPositive()
  stockQuantity: number;

  @IsOptional()
  brand: string;

  @IsOptional()
  imageUrl: string;

  @IsOptional()
  @Type(() => Number)
  weight: number;

  @IsOptional()
  dimensions: string;

  @IsNotEmpty()
  sku: string;

  @IsOptional()
  status: string;

  @IsOptional()
  @Expose()
  @Type(() => CategoryDto)
  category: CategoryDto;
}
