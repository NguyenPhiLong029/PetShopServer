import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { Roles } from 'src/decorators/roles.decorator';
import ProductDto from 'src/dto/product.dto';
import { UserRole } from 'src/entities/sso/user.entity';
import { ProductService } from 'src/services/product.service';

@Roles(UserRole.Admin, UserRole.Staff)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async get() {
    return await this.productService.find();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return await this.productService.findById(id);
  }

  @Post()
  @FormDataRequest()
  async create(@Body() payload: ProductDto) {
    return await this.productService.create(payload);
  }

  @Put('/:id')
  @FormDataRequest()
  async update(@Param('id') id: string, @Body() payload: ProductDto) {
    return await this.productService.update(id, payload);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Query('imageUrl') imageUrl: string) {
    return await this.productService.delete(id, imageUrl);
  }
}
