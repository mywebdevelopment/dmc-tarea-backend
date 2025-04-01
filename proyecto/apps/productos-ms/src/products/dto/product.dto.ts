import {
  IsBoolean,
  IsDecimal,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { CategoryDto } from "../../categories/dto/category.dto";
import { Expose, Type } from "class-transformer";
export class ProductDto {
  @IsNumber()
  @Expose()
  productId: number;

  @IsString()
  @Expose()
  name: string;

  @IsOptional()
  @Expose()
  description: string;

  @IsDecimal()
  @Expose()
  @Type(() => Number)
  price: number;

  @IsBoolean()
  @Expose()
  isOnSale: boolean;

  @IsDecimal()
  @Expose()
  @Type(() => Number)
  discountPrice: number;

  @IsDecimal()
  @Expose()
  @Type(() => Number)
  percentOnSale: number;

  @IsString()
  @Expose()
  sku: string;

  @IsNumber()
  @Expose()
  stockQuantity: number;

  @IsString()
  @IsOptional()
  @Expose()
  brand?: string;

  @IsString()
  @IsOptional()
  @Expose()
  status?: string;

  @IsString()
  @IsOptional()
  @Expose()
  imageUrl?: string;

  @IsOptional()
  @Expose()
  @Type(() => CategoryDto)
  category?: CategoryDto;
}
