import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import OptionDto from 'src/dto/option.dto';
import { Option } from 'src/entities/com/option.entity';
import { DataSource, DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class OptionService {
  constructor(
    @InjectDataSource('comConnection')
    private dataSource: DataSource
  ) {}
  optionRepository = this.dataSource.getRepository(Option);

  async find(): Promise<Option[]> {
    return this.optionRepository.find();
  }

  async findById(id: string): Promise<Option> {
    return this.optionRepository.findOneBy({ id });
  }

  async getKeys() {
    return this.optionRepository.find({
      select: {
        id: true,
        key: true
      }
    });
  }

  async getValuesByKey(key: string) {
    return this.optionRepository.find({
      select: {
        id: true,
        value: true
      },
      where: {
        key
      }
    });
  }

  async create(payload: OptionDto): Promise<Option> {
    const { key, value } = payload;
    return this.optionRepository.save({
      key,
      value
    });
  }

  async update(id: string, payload: OptionDto): Promise<UpdateResult> {
    const { key, value } = payload;
    return this.optionRepository.update(id, {
      key,
      value
    });
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.optionRepository.delete(id);
  }
}
