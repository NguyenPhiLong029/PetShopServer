import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import OptionDto from 'src/dto/option.dto';
import { UserRole } from 'src/entities/sso/user.entity';
import { OptionService } from 'src/services/option.service';

@Roles(UserRole.Admin, UserRole.Staff)
@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Get()
  async get() {
    return await this.optionService.find();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return await this.optionService.findById(id);
  }

  @Post()
  async create(@Body() payload: OptionDto) {
    return await this.optionService.create(payload);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() payload: OptionDto) {
    return await this.optionService.update(id, payload);
  }

  @Delete('/:id')
  async delete(@Param('id') id) {
    return await this.optionService.delete(id);
  }
}
