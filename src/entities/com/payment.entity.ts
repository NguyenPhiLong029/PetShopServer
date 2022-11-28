import { shinning_com } from 'src/utils/constants';
import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from '../base';
import { Order } from './order.entity';

@Entity({ name: 'payment', database: shinning_com })
export class Payment extends Base {
  @Column()
  title: string;

  @OneToMany(() => Order, (t) => t.payment)
  orders: Order[];
}
