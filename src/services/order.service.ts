import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { OrderDto } from 'src/dto/order.dto';
import { Order, OrderStatus } from 'src/entities/com/order.entity';
import { OrderLine } from 'src/entities/com/orderline.entity';
import { DataSource, UpdateResult } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectDataSource('comConnection')
    private dataSource: DataSource
  ) {}
  orderRepository = this.dataSource.getRepository(Order);
  orderlineRepository = this.dataSource.getRepository(OrderLine);

  async create(payload: OrderDto): Promise<Order> {
    const order = await this.orderRepository.save({
      totalQuantity: payload.totalQuantity,
      totalAmount: payload.totalAmount,
      totalWeight: payload.totalWeight,
      totalShipmentAmount: payload.totalShipmentAmount,
      status: OrderStatus.InProgress,
      payment: {
        id: payload.paymentId
      },
      shipment: {
        id: payload.shipmentId
      },
      fullname: payload.fullname,
      phone: payload.phone,
      email: payload.email,
      address: payload.address,
      userId: payload.userId
    });

    const orderlines = await this.orderlineRepository.save(
      payload.orderlines.map((line) => ({
        quantity: line.quantity,
        amount: line.amount,
        weight: line.weight,
        variant: {
          id: line.variantId
        },
        order: {
          id: order.id
        }
      }))
    );

    return { ...order, orderlines };
  }

  async getAll() {
    return this.orderRepository.find({
      relations: {
        orderlines: true,
        payment: true,
        shipment: true
      },
      select: {
        payment: {
          id: true,
          title: true
        },
        shipment: {
          id: true,
          title: true
        },
        orderlines: true
      }
    });
  }

  async getById(id: string): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id },
      relations: {
        orderlines: {
          variant: true
        },
        payment: true,
        shipment: true
      },
      select: {
        payment: {
          id: true,
          title: true
        },
        shipment: {
          id: true,
          title: true,
          costPerKg: true
        },
        orderlines: {
          amount: true,
          id: true,
          quantity: true,
          weight: true,
          variant: {
            title: true,
            sku: true,
            imageUrl: true,
            price: true,
            weight: true
          }
        }
      }
    });
  }

  async doneOrder(id: string): Promise<UpdateResult> {
    return this.orderRepository.update(id, { status: OrderStatus.Done });
  }

  async deliverOrder(id: string): Promise<UpdateResult> {
    return this.orderRepository.update(id, { status: OrderStatus.InDelivery });
  }

  async cancelOrder(id: string): Promise<UpdateResult> {
    return this.orderRepository.update(id, { status: OrderStatus.Cancel });
  }
}
