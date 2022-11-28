import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import ProductCardDto from 'src/dto/product-card.dto';
import { Category } from 'src/entities/com/category.entity';
import { Product } from 'src/entities/com/product.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ProductListService {
  constructor(
    @InjectDataSource('comConnection')
    private dataSource: DataSource
  ) {}
  productRepository = this.dataSource.getRepository(Product);

  async get(): Promise<ProductCardDto[]> {
    const res = await this.productRepository.find({
      relations: {
        variants: true
      }
    });

    const dto = res.map((p): ProductCardDto => {
      return {
        id: p.id,
        title: p.title,
        imageUrl: p.imageUrl,
        selectedVariant: p.variants?.length
          ? p.variants.reduce((selected, variant) => {
              if (variant.stock > 0 && variant.price > 0) {
                if (!selected || variant.price < selected.price) {
                  return {
                    id: variant.id,
                    price: variant.price
                  };
                }
              }
              return selected;
            }, null)
          : null
      };
    });

    return dto;
  }
}
