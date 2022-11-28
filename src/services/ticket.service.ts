import { Injectable } from '@nestjs/common';
import { Ticket } from 'src/entities/pm/ticket.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TicketService {
  constructor(private dataSource: DataSource) {}
  ticketRepository = this.dataSource.getRepository(Ticket);

  async create(payload: Ticket): Promise<any> {
    // return await this.ticketRepository.save(payload);
  }

  // async getList(): Promise<any[]> {
  //   return await this.ticketRepository.find();
  // }

  // async delete(_id: string): Promise<any> {
  //   return await this.ticketRepository.delete(_id);
  // }
  // async update(_id: string, payload: Ticket): Promise<any> {
  //   return await this.ticketRepository.update(_id, payload);
  // }
}
