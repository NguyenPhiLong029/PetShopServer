import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';

import { CategoryController } from 'src/controllers/com/admin/category.controller';
import { PaymentController } from 'src/controllers/com/admin/payment.controller';
import { ProductController } from 'src/controllers/com/admin/product.controller';
import { VariantController } from 'src/controllers/com/admin/variant.controller';
import { OptionController } from 'src/controllers/com/admin/option.controller';
import { ShipmentController } from 'src/controllers/com/admin/shipment.controller';

import { CategoryService } from 'src/services/category.service';
import { PaymentService } from 'src/services/payment.service';
import { ProductService } from 'src/services/product.service';
import { VariantService } from 'src/services/variant.service';
import { OptionService } from 'src/services/option.service';
import { ShipmentService } from 'src/services/shipment.service';
import { OrderController } from 'src/controllers/com/admin/order.controller';
import { OrderService } from 'src/services/order.service';

@Module({
  imports: [NestjsFormDataModule],
  controllers: [
    CategoryController,
    ProductController,
    PaymentController,
    VariantController,
    OptionController,
    ShipmentController,
    OrderController
  ],
  providers: [
    CategoryService,
    ProductService,
    PaymentService,
    VariantService,
    OptionService,
    ShipmentService,
    OrderService
  ]
})
export class AdminModule {}
