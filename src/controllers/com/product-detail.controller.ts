import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'src/decorators/auth.decorator';
import { ProductDetailService } from 'src/services/product-detail.service';

@Public()
@Controller('detail')
export class ProductDetailController {
  constructor(private readonly productDetailService: ProductDetailService) {}

  @Get('/:productId')
  async get(@Param('productId') productId: string) {
    return await this.productDetailService.get(productId);
  }
}
