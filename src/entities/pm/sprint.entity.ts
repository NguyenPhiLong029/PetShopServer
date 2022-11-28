import { shinning_pm } from 'src/utils/constants';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../base';
import { Project } from './project.entity';
import { Release } from './release.entity';
import { Ticket } from './ticket.entity';

@Entity({ name: 'sprint', database: shinning_pm })
export class Sprint extends Base {
  @Column()
  title: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => Project, (project) => project.sprints)
  project: Project;

  @OneToMany(() => Ticket, (ticket) => ticket.project)
  tickets: Ticket[];

  @ManyToOne(() => Release, (rel) => rel.sprint)
  release: Release;

  @Column()
  imageUrl: string;
}
