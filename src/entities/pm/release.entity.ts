import { shinning_pm } from 'src/utils/constants';
import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from '../base';
import { Sprint } from './sprint.entity';

@Entity({ name: 'release', database: shinning_pm })
export class Release extends Base {
  @Column()
  title: string;

  @Column()
  releaseDate: Date;

  @Column()
  version: string;

  @OneToMany(() => Sprint, (sprint) => sprint.release)
  sprint: Sprint[];

  @Column()
  imageUrl: string;
}
