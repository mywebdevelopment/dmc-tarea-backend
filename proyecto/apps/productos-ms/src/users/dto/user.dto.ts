import { Expose } from "class-transformer";

export class UserDto {
  @Expose()
  userId: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  gender: string;

  @Expose()
  birthDate: Date;

  @Expose()
  address: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  role: string;

  @Expose()
  status: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
