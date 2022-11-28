import { shinning_com } from 'src/utils/constants';
import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from '../base';
import { Product } from './product.entity';

@Entity({ name: 'category', database: shinning_com })
export class Category extends Base {
  @Column()
  title: string;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => Product, (t) => t.category)
  products: Product[];
}
