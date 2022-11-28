import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorators/auth.decorator';
import { ProductListService } from 'src/services/product-list.service';

@Public()
@Controller('product-list')
export class ProductListController {
  constructor(private readonly productListService: ProductListService) {}

  @Get()
  async get() {
    return await this.productListService.get();
  }
}
