import { PartialType } from '@nestjs/mapped-types';
import { CreateCartsItemDto } from './create-carts-item.dto';

export class UpdateCartsItemDto extends PartialType(CreateCartsItemDto) {
  id: number;
}
