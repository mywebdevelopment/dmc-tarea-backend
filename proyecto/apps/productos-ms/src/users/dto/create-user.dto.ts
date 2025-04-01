import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
  IsDate,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  gender?: string;

  @IsOptional()
  @IsDate()
  birthDate?: Date;

  @IsOptional()
  address?: string;

  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  @IsEnum(["customer", "admin"])
  role?: string;
}
