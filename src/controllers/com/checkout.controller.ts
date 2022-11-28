import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorators/auth.decorator';
import { PaymentService } from 'src/services/payment.service';
import { ShipmentService } from 'src/services/shipment.service';

@Public()
@Controller('checkout')
export class CheckoutController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly shipmentService: ShipmentService
  ) {}

  @Get('payment')
  async getPayment() {
    return await this.paymentService.find();
  }

  @Get('shipment')
  async getShipment() {
    return await this.shipmentService.find();
  }
}
