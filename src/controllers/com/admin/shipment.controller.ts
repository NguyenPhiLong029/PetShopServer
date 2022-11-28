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
import ShipmentDto from 'src/dto/shipment.dto';
import { UserRole } from 'src/entities/sso/user.entity';
import { ShipmentService } from 'src/services/shipment.service';

@Roles(UserRole.Admin, UserRole.Staff)
@Controller('shipment')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Get()
  async get() {
    return await this.shipmentService.find();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return await this.shipmentService.findById(id);
  }

  @Post()
  async create(@Body() payload: ShipmentDto) {
    return await this.shipmentService.create(payload);
  }

  @Put('/:id')
  async update(@Param('id') id, @Body() payload: ShipmentDto) {
    return await this.shipmentService.update(id, payload);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.shipmentService.delete(id);
  }
}
