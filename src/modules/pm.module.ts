import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';

import { ProjectController } from 'src/controllers/pm/project.controller';
import { SprintController } from 'src/controllers/pm/sprint.controller';
import { TicketController } from 'src/controllers/pm/ticket.controller';

import { ProjectService } from 'src/services/project.service';
import { TicketService } from 'src/services/ticket.service';
import { SprintService } from 'src/services/sprint.service';

@Module({
  imports: [NestjsFormDataModule],
  controllers: [ProjectController, SprintController, TicketController],
  providers: [ProjectService, SprintService, TicketService]
})
export class ProjectManagementModule {}
