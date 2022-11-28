import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';

import { CheckoutController } from 'src/controllers/com/checkout.controller';
import { OrderController } from 'src/controllers/com/order.controller';
import { ProductDetailController } from 'src/controllers/com/product-detail.controller';
import { ProductListController } from 'src/controllers/com/product-list.controller';
import { ReviewController } from 'src/controllers/com/review.controller';

import { OrderService } from 'src/services/order.service';
import { PaymentService } from 'src/services/payment.service';
import { ProductDetailService } from 'src/services/product-detail.service';
import { ProductListService } from 'src/services/product-list.service';
import { ReviewService } from 'src/services/review.service';
import { ShipmentService } from 'src/services/shipment.service';

@Module({
  imports: [NestjsFormDataModule],
  controllers: [
    ProductDetailController,
    ProductListController,
    OrderController,
    CheckoutController,
    ReviewController
  ],
  providers: [
    ProductDetailService,
    ProductListService,
    OrderService,
    PaymentService,
    ShipmentService,
    ReviewService
  ]
})
export class CommerceModule {}
