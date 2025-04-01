import { Module } from '@nestjs/common';
import { CartsItemService } from './carts-item.service';
import { CartsItemController } from './carts-item.controller';

@Module({
  controllers: [CartsItemController],
  providers: [CartsItemService],
})
export class CartsItemModule {}
