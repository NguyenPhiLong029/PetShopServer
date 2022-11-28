import { shinning_pm } from 'src/utils/constants';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from '../base';
import { Project } from './project.entity';
import { Sprint } from './sprint.entity';

enum TicketType {
  Task,
  Bug
}

enum TicketStatus {
  Open,
  InProgress,
  Done
}

@Entity({ name: 'ticket', database: shinning_pm })
export class Ticket extends Base {
  @Column()
  title: string;

  @Column()
  type: TicketType;

  @Column()
  status: TicketStatus;

  @Column()
  description: string;

  @ManyToOne(() => Project, (project) => project.tickets)
  project: Project;

  @ManyToOne(() => Sprint, (sprint) => sprint.tickets)
  sprint: Sprint;

  @Column()
  assigneeId: string;

  @Column()
  images: string;
}
