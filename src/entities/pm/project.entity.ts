import { shinning_pm } from 'src/utils/constants';
import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from '../base';
import { Sprint } from './sprint.entity';
import { Ticket } from './ticket.entity';

@Entity({ name: 'project', database: shinning_pm })
export class Project extends Base {
  @Column()
  title: string;

  @OneToMany(() => Ticket, (ticket) => ticket.project)
  tickets: Ticket[];

  @OneToMany(() => Sprint, (sprint) => sprint.project)
  sprints: Sprint[];

  @Column()
  imageUrl: string;
}
