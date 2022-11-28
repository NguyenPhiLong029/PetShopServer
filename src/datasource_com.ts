import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { shinning_com } from './utils/constants';

const config = {
  name: 'comConnection',
  type: 'mysql',
  host: '45.77.251.90',
  port: 3306,
  username: 'root',
  password: '12345678x@X',
  database: shinning_com,
  entities: [join(__dirname, 'entities/com/*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations/com/*.{ts,js}')],
  synchronize: true
};

export const CommerceConfig = config as TypeOrmModuleOptions;

export default new DataSource(config as DataSourceOptions);
