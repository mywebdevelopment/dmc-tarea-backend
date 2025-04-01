import { IsOptional, IsEmail, IsEnum, IsDate } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  gender?: string;

  @IsOptional()
  @IsDate()
  birthDate?: Date;

  @IsOptional()
  address?: string;

  @IsOptional()
  //@IsPhoneNumber()
  phoneNumber?: string;

  @IsOptional()
  @IsEnum(["customer", "admin"])
  role?: string;

  @IsOptional()
  @IsEnum(["active", "inactive"])
  status?: string;
}
