import {
  Controller,
  Get,
  Inject,
  Body,
  Delete,
  Param,
  Post,
  Put,
  UseInterceptors,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { PreInteceptor } from "../interceptor/pre.interceptor";
//import { TransformPipe } from "../pipes/transform.pipe";
//import { PostInteceptor } from "../interceptor/post.interceptor";
import { UpdateProductDto } from "apps/productos-ms/src/products/dto/update-product.dto";
import { ProductDto } from "apps/productos-ms/src/products/dto/product.dto";
import { ErrorResponse } from "apps/utils/types";
import { CreateProductDto } from "apps/productos-ms/src/products/dto/create-product.dto";

@Controller("v1/products")
export class ProductoController {
  constructor(
    @Inject("PRODUCTO_SERVICE")
    private readonly productoClient: ClientProxy,
  ) {}

  @Get()
  // @UseGuards(MiGuardGuard)
  async getProducts(): Promise<ProductDto[]> {
    console.log("getProducts");
    return await lastValueFrom(this.productoClient.send("findAll", {}));
  }

  @Get(":idProduct")
  @UseInterceptors(PreInteceptor)
  async getProductById(
    @Param("idProduct")
    idProducto: number,
  ): Promise<ProductDto | ErrorResponse> {
    try {
      return await lastValueFrom(
        this.productoClient.send("findOne", idProducto),
      );
    } catch (error) {
      console.error("error:", error);
      const responseError: ErrorResponse = {
        statusCode: 404,
        message: "Product not found",
      };
      return responseError;
    }
  }

  @Post()
  //@UseInterceptors(PostInteceptor)
  async createProduct(
    @Body()
    createProductDto: CreateProductDto,
  ): Promise<ProductDto | ErrorResponse> {
    console.log("Controller.crearProducto:", createProductDto);
    try {
      return await lastValueFrom(
        this.productoClient.send("create", createProductDto),
      );
    } catch (error) {
      console.error("Error Controller.crearProducto:", error);
      const responseError: ErrorResponse = {
        statusCode: 404,
        message: "Product not create",
      };
      return responseError;
    }
  }

  @Put(":idProduct")
  async updateProduct(
    @Param("idProduct")
    id: number,
    @Body()
    updateProductDTO: UpdateProductDto,
  ): Promise<ProductDto | Error> {
    try {
      return await lastValueFrom(
        this.productoClient.send("update", {
          id,
          updateProductDTO: updateProductDTO,
        }),
      );
    } catch (error) {
      console.error("error:", error);
      throw new Error("An error happened!");
    }
  }

  @Delete(":idProducto")
  async borrarProducto(
    @Param("idProducto")
    idProducto: number,
  ): Promise<string> {
    return await lastValueFrom(this.productoClient.send("remove", idProducto));
  }
}
