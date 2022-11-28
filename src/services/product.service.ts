import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { MemoryStoredFile } from 'nestjs-form-data';
import ProductDto from 'src/dto/product.dto';
import { Product } from 'src/entities/com/product.entity';
import { removeFile, saveFile } from 'src/utils/file';
import { makeSlug } from 'src/utils/url';
import { DataSource, DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectDataSource('comConnection')
    private dataSource: DataSource
  ) {}
  productRepository = this.dataSource.getRepository(Product);

  async find(): Promise<Product[]> {
    return this.productRepository.find({
      relations: {
        category: true
      },
      select: {
        category: {
          id: true,
          title: true
        }
      }
    });
  }

  async findById(id: string): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
      relations: {
        category: true
      },
      select: {
        category: {
          id: true,
          title: true
        }
      }
    });
  }

  async create(payload: ProductDto): Promise<Product> {
    let imageUrl = null;
    if (payload.image instanceof MemoryStoredFile) {
      imageUrl = saveFile(makeSlug(payload.title), payload.image);
    }

    return this.productRepository.save({
      title: payload.title,
      description: payload.description,
      category: {
        id: payload.categoryId
      },
      imageUrl
    });
  }

  async update(id: string, payload: ProductDto): Promise<UpdateResult> {
    const { title, description } = payload;

    let imageUrl = null;
    if (payload.image instanceof MemoryStoredFile) {
      imageUrl = saveFile(makeSlug(title), payload.image);
      if (payload.imageUrl && payload.imageUrl !== imageUrl) {
        removeFile(payload.imageUrl);
      }
    }

    return this.productRepository.update(id, {
      title,
      description,
      category: {
        id: payload.categoryId
      },
      imageUrl: imageUrl || undefined
    });
  }

  async delete(id: string, imageUrl?: string): Promise<DeleteResult> {
    if (imageUrl) {
      removeFile(imageUrl);
    }
    return this.productRepository.delete(id);
  }
}
