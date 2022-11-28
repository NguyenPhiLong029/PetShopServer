export default class ProductCardDto {
  id: string;
  imageUrl: string;
  title: string;
  selectedVariant?: {
    id: string;
    price: number;
  };
}
