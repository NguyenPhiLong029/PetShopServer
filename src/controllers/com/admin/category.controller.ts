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
import CategoryDto from 'src/dto/category.dto';
import { UserRole } from 'src/entities/sso/user.entity';
import { CategoryService } from 'src/services/category.service';

@Roles(UserRole.Admin, UserRole.Staff)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async get() {
    return await this.categoryService.find();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return await this.categoryService.findById(id);
  }

  @Post()
  @FormDataRequest()
  async create(@Body() payload: CategoryDto) {
    return await this.categoryService.create(payload);
  }

  @Put('/:id')
  @FormDataRequest()
  async update(@Param('id') id: string, @Body() payload: CategoryDto) {
    return await this.categoryService.update(id, payload);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Query('imageUrl') imageUrl: string) {
    return await this.categoryService.delete(id, imageUrl);
  }
}
