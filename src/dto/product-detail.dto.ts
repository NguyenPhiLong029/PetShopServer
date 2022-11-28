import { Variant } from 'src/entities/com/variant.entity';

export class OptionsDto {
  key: string;
  values: string[];
}

export default class ProductDetailDto {
  images: string[];
  title: string;
  options: OptionsDto[];
  description: string;
  variants: Variant[];
  selectedVariant?: Variant;
}
