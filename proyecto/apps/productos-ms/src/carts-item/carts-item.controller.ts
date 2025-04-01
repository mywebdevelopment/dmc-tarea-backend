import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CartsItemService } from "./carts-item.service";
import { CreateCartsItemDto } from "./dto/create-carts-item.dto";
import { UpdateCartsItemDto } from "./dto/update-carts-item.dto";

@Controller()
export class CartsItemController {
  constructor(private readonly cartsItemService: CartsItemService) {}

  @MessagePattern("createCartsItem")
  create(@Payload() createCartsItemDto: CreateCartsItemDto) {
    return this.cartsItemService.create(createCartsItemDto);
  }

  @MessagePattern("findAllCartsItem")
  findAll() {
    return this.cartsItemService.findAll();
  }

  @MessagePattern("findOneCartsItem")
  findOne(@Payload() id: number) {
    return this.cartsItemService.findOne(id);
  }

  @MessagePattern("updateCartsItem")
  update(@Payload() updateCartsItemDto: UpdateCartsItemDto) {
    return this.cartsItemService.update(
      updateCartsItemDto.id,
      updateCartsItemDto,
    );
  }

  @MessagePattern("removeCartsItem")
  remove(@Payload() id: number) {
    return this.cartsItemService.remove(id);
  }
}
