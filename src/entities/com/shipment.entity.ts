import { shinning_com } from 'src/utils/constants';
import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from '../base';
import { Order } from './order.entity';

@Entity({ name: 'shipment', database: shinning_com })
export class Shipment extends Base {
  @Column()
  title: string;

  @Column()
  costPerKg: number;

  @OneToMany(() => Order, (t) => t.shipment)
  orders: Order[];
}
