import { IsOptional } from "class-validator";

export class CreateCartDto {
  @IsOptional()
  userId?: number;
}
