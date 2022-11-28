import { shinning_com } from 'src/utils/constants';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from '../base';
import { Order } from './order.entity';
import { Variant } from './variant.entity';

@Entity({ name: 'orderline', database: shinning_com })
export class OrderLine extends Base {
  @Column()
  quantity: number;

  @Column()
  amount: number;

  @Column({ type: 'decimal', precision: 5, scale: 3 })
  weight: number;

  @ManyToOne(() => Variant, (t) => t.orderlines)
  variant: Variant;

  @ManyToOne(() => Order, (t) => t.orderlines)
  order: Order;
}
