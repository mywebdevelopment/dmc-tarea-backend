import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { CreateProductDto } from "apps/productos-ms/src/products/dto/create-product.dto";

@Injectable()
export class TransformPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): CreateProductDto {
    const transformedBody = value as CreateProductDto;
    const newDescription = transformedBody.name
      .split(" ")
      .filter((s) => s)
      .join(" ");
    transformedBody.name = newDescription;
    return transformedBody;
  }
}
