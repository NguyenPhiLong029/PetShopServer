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
import VariantDto from 'src/dto/variant.dto';
import { UserRole } from 'src/entities/sso/user.entity';
import { VariantService } from 'src/services/variant.service';

@Roles(UserRole.Admin, UserRole.Staff)
@Controller('variant')
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  @Get('/')
  async getByProduct(@Query('productId') productId: string) {
    return await this.variantService.findBy(productId);
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return await this.variantService.findById(id);
  }

  @Post()
  @FormDataRequest()
  async create(@Body() payload: VariantDto) {
    return await this.variantService.create(payload);
  }

  @Put('/:id')
  @FormDataRequest()
  async update(@Param('id') id: string, @Body() payload: VariantDto) {
    return await this.variantService.update(id, payload);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Query('imageUrl') imageUrl: string) {
    return await this.variantService.delete(id, imageUrl);
  }
}
