import { shinning_com } from 'src/utils/constants';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../base';
import { Category } from './category.entity';
import { Review } from './review.entity';
import { Variant } from './variant.entity';

@Entity({ name: 'product', database: shinning_com })
export class Product extends Base {
  @Column()
  title: string;

  @Column({ length: 2500 })
  description: string;

  @ManyToOne(() => Category, (t) => t.products)
  category: Category;

  @OneToMany(() => Variant, (t) => t.product)
  variants: Variant[];

  @OneToMany(() => Review, (t) => t.product)
  reviews: Review[];

  @Column({ nullable: true })
  imageUrl: string;
}
