import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { MemoryStoredFile } from 'nestjs-form-data';
import RegisterDto from 'src/dto/register.dto';
import { UserRole } from 'src/entities/sso/user.entity';
import { User } from 'src/entities/sso/user.entity';
import { hashPassword } from 'src/utils/auth';
import { saveFile } from 'src/utils/file';
import { makeSlug } from 'src/utils/url';
import { DataSource, DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectDataSource('ssoConnection')
    private dataSource: DataSource
  ) {}

  private userRepository = this.dataSource.getRepository(User);

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async create(payload: RegisterDto): Promise<Omit<User, 'passwordHash'>> {
    const pwHash = await hashPassword(payload.password);
    const { passwordHash, ...response } = await this.userRepository.save({
      ...payload,
      passwordHash: pwHash,
      isActive: true,
      role: (payload.role = UserRole.Customer)
    });
    return response;
  }

  async update(id: string, payload: RegisterDto): Promise<User> {
    console.log('9999 payload', payload);
    const pwHash = await hashPassword(payload.password);
    await this.userRepository.update(id, {
      ...payload,
      passwordHash: pwHash,
      isActive: true
    });

    const response = await this.userRepository.findOneBy({ id });
    return response;
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
