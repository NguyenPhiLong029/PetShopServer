import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import PaymentDto from 'src/dto/payment.dto';
import { Payment } from 'src/entities/com/payment.entity';
import { DataSource, DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectDataSource('comConnection')
    private dataSource: DataSource
  ) {}
  paymentRepository = this.dataSource.getRepository(Payment);

  async find(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  async findById(id: string): Promise<Payment> {
    return this.paymentRepository.findOneBy({ id });
  }

  async create(payload: PaymentDto): Promise<Payment> {
    return this.paymentRepository.save(payload);
  }

  async update(id: string, payload: PaymentDto): Promise<UpdateResult> {
    const { title } = payload;
    return this.paymentRepository.update(id, { title });
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.paymentRepository.delete(id);
  }
}
