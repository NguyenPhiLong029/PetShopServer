import { MemoryStoredFile } from 'nestjs-form-data';

export default class VariantDto {
  title: string;
  sku: string;
  stock: number;
  price: number;
  weight: number;
  productId: string;
  option1Id?: string;
  option2Id?: string;
  option3Id?: string;
  image?: MemoryStoredFile;
  imageUrl?: string;
}
