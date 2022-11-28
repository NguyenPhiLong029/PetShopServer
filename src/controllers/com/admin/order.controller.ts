import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { OrderDto } from 'src/dto/order.dto';
import { UserRole } from 'src/entities/sso/user.entity';
import { OrderService } from 'src/services/order.service';

@Roles(UserRole.Admin, UserRole.Staff)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(payload: OrderDto) {
    return await this.orderService.create(payload);
  }

  @Get()
  async get() {
    return await this.orderService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return await this.orderService.getById(id);
  }

  @Put('/status/done/:id')
  async done(@Param('id') id: string) {
    return await this.orderService.doneOrder(id);
  }

  @Put('/status/deliver/:id')
  async deliver(@Param('id') id: string) {
    return await this.orderService.deliverOrder(id);
  }

  @Put('/status/cancel/:id')
  async cancel(@Param('id') id: string) {
    return await this.orderService.cancelOrder(id);
  }
}
