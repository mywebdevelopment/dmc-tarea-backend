import { IsOptional } from "class-validator";

export class UpdateCartDto {
  @IsOptional()
  userId?: number;
}
