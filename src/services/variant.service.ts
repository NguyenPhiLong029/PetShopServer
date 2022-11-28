import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { id } from 'inversify';
import { MemoryStoredFile } from 'nestjs-form-data';
import VariantDto from 'src/dto/variant.dto';
import { Variant } from 'src/entities/com/variant.entity';
import { removeFile, saveFile } from 'src/utils/file';
import { makeSlug } from 'src/utils/url';
import { DataSource, DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class VariantService {
  constructor(
    @InjectDataSource('comConnection')
    private dataSource: DataSource
  ) {}
  variantRepository = this.dataSource.getRepository(Variant);

  async findBy(productId: string): Promise<Variant[]> {
    return this.variantRepository.find({
      relations: {
        option_1: true,
        option_2: true,
        option_3: true
      },
      where: {
        product: {
          id: productId
        }
      }
    });
  }

  async findById(id: string): Promise<Variant> {
    return this.variantRepository.findOne({
      where: {
        id
      },
      relations: {
        option_1: true,
        option_2: true,
        option_3: true
      },
      select: {
        option_1: {
          id: true,
          key: true,
          value: true
        },
        option_2: {
          id: true,
          key: true,
          value: true
        },
        option_3: {
          id: true,
          key: true,
          value: true
        }
      }
    });
  }

  async create(payload: VariantDto): Promise<Variant> {
    const {
      title,
      sku,
      stock,
      price,
      weight,
      option1Id,
      option2Id,
      option3Id,
      productId,
      image
    } = payload;

    let imageUrl = null;
    if (image instanceof MemoryStoredFile) {
      imageUrl = saveFile(makeSlug(title), image);
    }

    const variant1: any = {
      title,
      sku,
      stock,
      price,
      weight,
      product: {
        id: productId
      },
      option_1: {
        id: option1Id
      },
      imageUrl
    };

    if (option2Id && option2Id !== 'undefined') {
      variant1.option_2 = {
        id: option2Id
      };
    }

    if (option3Id && option3Id !== 'undefined') {
      variant1.option_3 = {
        id: option3Id
      };
    }

    return this.variantRepository.save(variant1);
  }

  async update(id: string, payload: VariantDto): Promise<UpdateResult> {
    const {
      title,
      sku,
      stock,
      price,
      weight,
      option1Id,
      option2Id,
      option3Id,
      productId,
      image
    } = payload;

    let imageUrl = null;
    if (image instanceof MemoryStoredFile) {
      imageUrl = saveFile(makeSlug(title), image);
      if (payload.imageUrl && payload.imageUrl !== imageUrl) {
        removeFile(payload.imageUrl);
      }
    }

    const variant2: any = {
      title,
      sku,
      stock,
      price,
      weight,
      product: {
        id: productId
      },
      option_1: {
        id: option1Id
      },
      imageUrl: imageUrl || undefined
    };

    if (option2Id && option2Id !== 'undefined') {
      variant2.option_2 = {
        id: option2Id
      };
    }

    if (option3Id && option3Id !== 'undefined') {
      variant2.option_3 = {
        id: option3Id
      };
    }

    return this.variantRepository.update(id, variant2);
  }

  async delete(id: string, imageUrl?: string): Promise<DeleteResult> {
    if (imageUrl) {
      removeFile(imageUrl);
    }
    return this.variantRepository.delete(id);
  }
}
