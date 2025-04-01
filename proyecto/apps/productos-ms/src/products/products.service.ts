import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { Repository } from "typeorm";
import { UpdateProductDto } from "./dto/update-product.dto";
import { plainToInstance } from "class-transformer";
import { ProductDto } from "./dto/product.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { CategoryEntity } from "../categories/entities/category.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  async findAll(): Promise<ProductDto[]> {
    const products = await this.productRepository.find({
      relations: ["category", "category.parentCategory"],
    });
    console.log("ProductsService.findAll", products[1]);
    return plainToInstance(ProductDto, products, {
      excludeExtraneousValues: true,
      enableCircularCheck: true,
    });
  }

  async findOne(id: number): Promise<ProductDto> {
    const product = await this.productRepository.findOne({
      where: { productId: id },
      relations: ["category", "category.parentCategory"],
    });
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return plainToInstance(ProductDto, product, {
      excludeExtraneousValues: true,
    });
  }

  async create(createProductDto: CreateProductDto): Promise<ProductDto> {
    if (createProductDto.isOnSale) {
      createProductDto.discountPrice =
        createProductDto.price -
        (createProductDto.percentOnSale / 100) * createProductDto.price;
    } else {
      createProductDto.discountPrice = createProductDto.price;
    }

    const category = await this.categoryRepository.findOne({
      where: { categoryId: createProductDto.category.categoryId },
    });

    if (!category) {
      throw new Error(
        `Category with id ${createProductDto.category.categoryId} not found`,
      );
    }
    try {
      const product = this.productRepository.create(createProductDto);
      const productSave = await this.productRepository.save(product);
      return plainToInstance(ProductDto, productSave, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      console.log("error create product: ", error);
      throw new Error("Error saving the product: ");
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    console.log("ms ProductsService.update", updateProductDto);
    if (updateProductDto.isOnSale) {
      updateProductDto.discountPrice =
        updateProductDto.price -
        (updateProductDto.percentOnSale / 100) * updateProductDto.price;
    } else {
      updateProductDto.percentOnSale = 0;
      updateProductDto.discountPrice = updateProductDto.price;
    }
    const updatedProduct = await this.productRepository.preload({
      productId: id,
      ...updateProductDto,
    });

    if (!updatedProduct) {
      throw new Error(`Product with id ${id} not found`);
    }
    const result = await this.productRepository.save(updatedProduct);
    if (!result) {
      throw new Error(`Error updating the product ${id}`);
    }
    const product = await this.findOne(id);

    return plainToInstance(ProductDto, product, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: number): Promise<string> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Producto con ID ${id} no encontrado.`);
    }
    return `Product  ${id} deleted`;
  }
  /*
  async getAllProducts(): Promise<ProductEntity[]> {
    const limit = 100;
    const products = await this.dataSource.query(
      `
      SELECT p.*, c.name_categoria 
      FROM public.products p
      LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
      WHERE p.price > $1
      ORDER BY p.price DESC
    `,
      [limit],
    );
    return products;
  }

  async crearProducto(newProducto: Product): Promise<ProductEntity> {
    if (newProducto.isOferta) {
      newProducto.finalPrice =
        newProducto.price - newProducto.price * newProducto.porcentajeOferta;
    } else {
      newProducto.finalPrice = newProducto.price;
    }

    const categoria = await this.categoriasService.findOne(
      newProducto.categoria_id,
    );

    if (!categoria) {
      throw new Error(
        `Categoria with id ${newProducto.categoria_id} not found`,
      );
    }

    const productEntity = this.productRepository.create({
      ...newProducto,
      categoria: categoria,
    });
    return await this.productRepository.save(productEntity);
  }

  async updateProducto(id: string, newProducto: ProductEntity) {
    await this.findProduct(id);

    if (newProducto.isOferta) {
      newProducto.finalPrice =
        newProducto.price - newProducto.price * newProducto.porcentajeOferta;
    } else {
      newProducto.finalPrice = newProducto.price;
    }

    return await this.productRepository.update({ id: +id }, newProducto);
  }

  async deleteProduct(id: string) {
    await this.productRepository.softDelete({ id: +id });
    return "Product deleted";
  }
    */
}
