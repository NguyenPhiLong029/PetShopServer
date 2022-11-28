import { shinning_com } from 'src/utils/constants';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Base } from '../base';
import { OrderLine } from './orderline.entity';
import { Payment } from './payment.entity';
import { Shipment } from './shipment.entity';

export enum OrderStatus {
  InCart = 'in-cart',
  InProgress = 'in-progress',
  InDelivery = 'in-delivery',
  Done = 'done',
  Cancel = 'cancel'
}

@Entity({ name: 'order', database: shinning_com })
export class Order extends Base {
  @Column()
  totalQuantity: number;

  @Column()
  totalAmount: number;

  @Column()
  totalShipmentAmount: number;

  @Column({ type: 'decimal', precision: 5, scale: 3 })
  totalWeight: number;

  @Column()
  status: OrderStatus;

  @OneToMany(() => OrderLine, (t) => t.order)
  orderlines: OrderLine[];

  @ManyToOne(() => Payment, (p) => p.orders)
  payment: Payment;

  @ManyToOne(() => Shipment, (s) => s.orders)
  shipment: Shipment;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  fullname: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address: string;
}
