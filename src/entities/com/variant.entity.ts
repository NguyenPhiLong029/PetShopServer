import { shinning_com } from 'src/utils/constants';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Base } from '../base';
import { OrderLine } from './orderline.entity';
import { Product } from './product.entity';
import { Option } from './option.entity';

@Entity({ name: 'variant', database: shinning_com })
export class Variant extends Base {
  @Column()
  title: string;

  @Column()
  sku: string;

  @Column()
  stock: number;

  @Column()
  price: number;

  @Column({ type: 'decimal', precision: 5, scale: 3 })
  weight: number;

  @ManyToOne(() => Option)
  @JoinColumn()
  option_1: Option;

  @ManyToOne(() => Option, { nullable: true })
  @JoinColumn()
  option_2: Option;

  @ManyToOne(() => Option, { nullable: true })
  @JoinColumn()
  option_3: Option;

  @ManyToOne(() => Product, (t) => t.variants)
  product: Product;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => OrderLine, (t) => t.variant)
  orderlines: OrderLine[];
}
