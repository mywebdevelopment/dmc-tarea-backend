/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern("createUser")
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern("findAllUsers")
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern("findOneUser")
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern("updateUser")
  update(@Payload() updateUser: any) {
    const { id, updateUserDto }: { id: number; updateUserDto: UpdateUserDto } =
      updateUser;

    return this.usersService.update(id, updateUserDto);
  }

  @MessagePattern("removeUser")
  remove(@Payload() id: number) {
    return this.usersService.remove(id);
  }
}
