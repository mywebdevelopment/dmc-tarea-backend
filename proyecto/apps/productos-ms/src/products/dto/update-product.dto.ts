import { Expose, Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";
import { CategoryDto } from "../../categories/dto/category.dto";
export class UpdateProductDto {
  @IsOptional()
  @Expose()
  name: string;

  @IsOptional()
  @Expose()
  description: string;

  @IsPositive()
  @IsOptional()
  @Expose()
  price: number;

  @IsOptional()
  @Expose()
  isOnSale: boolean;

  @IsOptional()
  @Expose()
  percentOnSale: number;

  @IsOptional()
  @Expose()
  discountPrice: number;

  @IsOptional()
  @Expose()
  stockQuantity: number;

  @IsOptional()
  @Expose()
  brand: string;

  @IsOptional()
  @Expose()
  imageUrl: string;

  @IsOptional()
  @Expose()
  weight: number;

  @IsOptional()
  @Expose()
  dimensions: string;

  @IsOptional()
  @Expose()
  sku: string;

  @IsOptional()
  @Expose()
  status: string;

  @IsOptional()
  @Expose()
  @Type(() => CategoryDto)
  category: CategoryDto;
}
