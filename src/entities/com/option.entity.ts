import { shinning_com } from 'src/utils/constants';
import { Entity, Column } from 'typeorm';
import { Base } from '../base';

@Entity({ name: 'option', database: shinning_com })
export class Option extends Base {
  @Column()
  key: string;

  @Column()
  value: string;
}
