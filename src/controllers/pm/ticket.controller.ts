import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { Ticket } from 'src/entities/pm/ticket.entity';
import { TicketService } from 'src/services/ticket.service';
import { DataSource } from 'typeorm';

@Controller('ticket')
export class TicketController {
  constructor(
    private dataSource: DataSource,
    private ticketService: TicketService
  ) {}
  ticketRepository = this.dataSource.getRepository(Ticket);

  @Get('/')
  async get(): Promise<any> {
    return await this.ticketRepository.find();
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.ticketRepository.delete(id);
  }

  @Put('/:id')
  async update(@Body() body: any, @Param('id') id: string) {
    return await this.ticketRepository.update(id, body);
  }
}
