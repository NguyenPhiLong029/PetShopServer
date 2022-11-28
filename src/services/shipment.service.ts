import { Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, UpdateResult } from 'typeorm';
import ShipmentDto from 'src/dto/shipment.dto';
import { Shipment } from 'src/entities/com/shipment.entity';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectDataSource('comConnection')
    private dataSource: DataSource
  ) {}
  shipmentRepository = this.dataSource.getRepository(Shipment);

  async find(): Promise<Shipment[]> {
    return this.shipmentRepository.find();
  }

  async findById(id: string): Promise<Shipment> {
    return this.shipmentRepository.findOne({
      where: { id }
    });
  }

  async create(payload: ShipmentDto): Promise<Shipment> {
    return this.shipmentRepository.save({
      title: payload.title,
      costPerKg: payload.costPerKg
    });
  }

  async update(id: string, payload: ShipmentDto): Promise<UpdateResult> {
    return this.shipmentRepository.update(id, {
      title: payload.title,
      costPerKg: payload.costPerKg
    });
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.shipmentRepository.delete(id);
  }
}
