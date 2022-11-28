import { MemoryStoredFile } from 'nestjs-form-data';

export default class CategoryDto {
  title: string;
  image?: MemoryStoredFile;
  imageUrl?: string;
}
