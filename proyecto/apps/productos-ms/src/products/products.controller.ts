/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Param } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @MessagePattern("findAll")
  async findAll() {
    const products = await this.productsService.findAll();
    console.log("ProductsController.findAll", products[1]);
    return products;
  }

  @MessagePattern("findOne")
  async findOne(@Param("id") id: number) {
    return this.productsService.findOne(id);
  }

  @MessagePattern("create")
  async create(@Payload() createProductDto: CreateProductDto) {
    console.log("ms ProductsController.create", createProductDto);
    return this.productsService.create(createProductDto);
  }

  @MessagePattern("update")
  async update(
    @Payload()
    updateProduct: any,
  ) {
    console.log("ms ProductsController.update", updateProduct);
    const {
      id,
      updateProductDTO,
    }: { id: number; updateProductDTO: UpdateProductDto } = updateProduct;
    console.log("ms ProductsController.update", id, updateProductDTO);
    return this.productsService.update(id, updateProductDTO);
  }

  @MessagePattern("remove")
  async remove(@Param("id") id: number) {
    return this.productsService.remove(id);
  }
}
/*
@Controller()
export class ProductsController {
  constructor(private readonly appService: ProductsService) {}

  @MessagePattern("getProducts")
  async getProducts(): Promise<Product[]> {
    return await this.appService.getAllProducts();
  }

  @MessagePattern("getProductById")
  async getProductById(
    @Payload()
    idProducto: string,
  ): Promise<ProductEntity> {
    try {
      return await this.appService.findProduct(idProducto);
    } catch (error) {
      console.error("error:", error);
      throw new Error("An error happened!");
    }
  }

  @MessagePattern("crearProducto")
  async crearProducto(
    @Payload()
    newProductoBody: Product,
  ): Promise<ProductEntity> {
    return await this.appService.crearProducto(newProductoBody);
  }

  @MessagePattern("actualizarProducto")
  actualizarProducto(
    @Payload()
    valoresUpdate: any,
  ) {
    try {
      const { idProducto, newProductoBody } = valoresUpdate;
      return this.appService.updateProducto(idProducto, newProductoBody);
    } catch (error) {
      console.error("error:", error);
      throw new Error("An error happened!");
    }
  }

  @MessagePattern("borrarProducto")
  borrarProducto(
    @Payload()
    idProducto: number,
  ) {
    try {
      return this.appService.deleteProduct(idProducto);
    } catch (error) {
      console.error("error:", error);
      throw new Error("An error happened!");
    }
  }
}
*/
