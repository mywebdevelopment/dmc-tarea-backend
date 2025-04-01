/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateCategoryDto } from "apps/productos-ms/src/categories/dto/create-category.dto";
import { UpdateCategoryDto } from "apps/productos-ms/src/categories/dto/update-category.dto";
import { lastValueFrom } from "rxjs";

@Controller("categoria")
export class CategoriaController {
  constructor(
    @Inject("PRODUCTO_SERVICE")
    private readonly productoClient: ClientProxy,
  ) {}

  @Get()
  async findAll() {
    return await lastValueFrom(
      this.productoClient.send("get.all.categories", {}),
    );
  }

  @Get(":id")
  findOne(@Param("id") id: string): string {
    return `This action returns a categoria with id ${id}`;
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): string {
    return `This action adds a new categoria ${createCategoryDto.name}`;
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): string {
    return `This action updates a categoria with id ${id} ${updateCategoryDto.name}`;
  }

  @Delete(":id")
  remove(@Param("id") id: string): string {
    return `This action removes a categoria with id ${id}`;
  }
}
