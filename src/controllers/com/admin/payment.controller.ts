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
import PaymentDto from 'src/dto/payment.dto';
import { UserRole } from 'src/entities/sso/user.entity';
import { PaymentService } from 'src/services/payment.service';

@Roles(UserRole.Admin, UserRole.Staff)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async get() {
    return await this.paymentService.find();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return await this.paymentService.findById(id);
  }

  @Post()
  async create(@Body() payload: PaymentDto) {
    return await this.paymentService.create(payload);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() payload: PaymentDto) {
    return await this.paymentService.update(id, payload);
  }

  @Delete('/:id')
  async delete(@Param('id') id) {
    return await this.paymentService.delete(id);
  }
}
