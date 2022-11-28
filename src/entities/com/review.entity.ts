import { shinning_com } from 'src/utils/constants';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from '../base';
import { Product } from './product.entity';

@Entity({ name: 'review', database: shinning_com })
export class Review extends Base {
  @Column({ length: 1000 })
  message: string;

  @Column({ nullable: true })
  star: number;

  @Column()
  isPublish: boolean;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => Product, (t) => t.reviews)
  product: Product;
}
