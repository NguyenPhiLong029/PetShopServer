import { MemoryStoredFile } from 'nestjs-form-data';

export default class ProductDto {
  title: string;
  description: string;
  categoryId?: string;
  image?: MemoryStoredFile;
  imageUrl?: string;
}
