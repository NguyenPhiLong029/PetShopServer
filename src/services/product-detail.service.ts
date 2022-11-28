import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import ProductDetailDto, { OptionsDto } from 'src/dto/product-detail.dto';
import { Product } from 'src/entities/com/product.entity';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class ProductDetailService {
  constructor(
    @InjectDataSource('comConnection')
    private dataSource: DataSource
  ) {}

  productRepository = this.dataSource.getRepository(Product);

  async get(productId: string): Promise<ProductDetailDto> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: {
        variants: {
          option_1: true,
          option_2: true,
          option_3: true
        }
      }
    });

    if (!product) {
      return null;
    }

    const images = product.variants.map((v) => v.imageUrl);
    images.unshift(product.imageUrl);

    const options: OptionsDto[] = [];

    const appendOption = (key: string, value: string) => {
      const found = options.find((o) => o.key === key);
      if (found) {
        if (!found.values.some((i) => i === value)) {
          found.values = [...found.values, value];
        }
        return;
      }
      options.push({
        key,
        values: [value]
      });
    };

    product.variants.forEach((v) => {
      v.option_1 && appendOption(v.option_1.key, v.option_1.value);
      v.option_2 && appendOption(v.option_2.key, v.option_2.value);
      v.option_3 && appendOption(v.option_3.key, v.option_3.value);
    });

    const selectedVariant = product.variants?.length
      ? product.variants.reduce((selected, variant) => {
          if (variant.stock > 0 && variant.price > 0) {
            if (!selected || variant.price < selected.price) {
              return variant;
            }
          }
          return selected;
        }, null)
      : null;

    return {
      images,
      title: product.title,
      description: product.description,
      variants: product.variants.map((v) => ({
        ...v,
        weight: parseFloat(v.weight as any)
      })),
      options,
      selectedVariant: {
        ...selectedVariant,
        weight: parseFloat(selectedVariant.weight as any)
      }
    };
  }
}
