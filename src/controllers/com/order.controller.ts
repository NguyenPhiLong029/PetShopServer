import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/decorators/auth.decorator';
import { OrderDto, OrderLineDto } from 'src/dto/order.dto';
import { OrderService } from 'src/services/order.service';

@Public()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() payload: OrderDto) {
    return await this.orderService.create(payload);
  }

  @Get()
  async get() {
    return await this.orderService.getAll();
  }
}
