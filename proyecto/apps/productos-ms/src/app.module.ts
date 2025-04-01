import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesModule } from "./categories/categories.module";
import { CategoryEntity } from "./categories/entities/category.entity";
import { ProductsModule } from "./products/products.module";
import { CartsModule } from "./carts/carts.module";
import { ProductEntity } from "./products/entities/product.entity";
import { CartsItemModule } from "./carts-item/carts-item.module";
import { UsersModule } from "./users/users.module";
import { CartItemEntity } from "./carts-item/entities/carts-item.entity";
import { CartEntity } from "./carts/entities/cart.entity";
import { UserEntity } from "./users/entities/user.entity";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT!),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        ProductEntity,
        CategoryEntity,
        CartItemEntity,
        CartEntity,
        UserEntity,
      ],
      synchronize: false,
      retryAttempts: 2,
      retryDelay: 1000,
      connectTimeoutMS: 5000,
      logging: true,
      migrations: [__dirname + "/../migrations/*{.ts,.js}"],
      migrationsTableName: "migrations_history",
    }),
    TypeOrmModule.forFeature([
      ProductEntity,
      CategoryEntity,
      CartItemEntity,
      CartEntity,
      UserEntity,
    ]),
    CategoriesModule,
    ProductsModule,
    CartsModule,
    CartsItemModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
