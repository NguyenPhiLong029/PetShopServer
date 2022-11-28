import { Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, UpdateResult } from 'typeorm';
import { Category } from 'src/entities/com/category.entity';
import CategoryDto from 'src/dto/category.dto';
import { removeFile, saveFile } from 'src/utils/file';
import { MemoryStoredFile } from 'nestjs-form-data';
import { makeSlug } from 'src/utils/url';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectDataSource('comConnection')
    private dataSource: DataSource
  ) {}
  categoryRepository = this.dataSource.getRepository(Category);

  async find(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findById(id: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where: { id }
    });
  }

  async create(payload: CategoryDto): Promise<Category> {
    const { title, image } = payload;
    let imageUrl = null;
    if (image instanceof MemoryStoredFile) {
      imageUrl = saveFile(makeSlug(title), image);
    }
    return this.categoryRepository.save({
      title: payload.title,
      imageUrl
    });
  }

  async update(id: string, payload: CategoryDto): Promise<UpdateResult> {
    const { title, image } = payload;
    let imageUrl = null;
    if (image instanceof MemoryStoredFile) {
      imageUrl = saveFile(makeSlug(title), image);
      if (payload.imageUrl && payload.imageUrl !== imageUrl) {
        removeFile(payload.imageUrl);
      }
    }
    return this.categoryRepository.update(id, {
      title: payload.title,
      imageUrl: imageUrl || undefined
    });
  }

  async delete(id: string, imageUrl?: string): Promise<DeleteResult> {
    if (imageUrl) {
      removeFile(imageUrl);
    }
    return this.categoryRepository.delete(id);
  }
}
