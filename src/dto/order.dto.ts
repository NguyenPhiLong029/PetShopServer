import { OrderStatus } from 'src/entities/com/order.entity';

export class OrderDto {
  totalQuantity: number;
  totalAmount: number;
  totalWeight: number;
  totalShipmentAmount: number;
  status: OrderStatus;
  orderlines: OrderLineDto[];
  paymentId: string;
  shipmentId: string;
  userId?: string;
  fullname?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export class OrderLineDto {
  quantity: number;
  amount: number;
  weight?: number;
  variantId: string;
  orderId: string;
}
