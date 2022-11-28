import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { shinning_pm } from './utils/constants';

const config = {
  name: 'pmConnection',
  type: 'mysql',
  host: '45.77.251.90',
  port: 3306,
  username: 'root',
  password: '12345678x@X',
  database: shinning_pm,
  entities: [join(__dirname, 'entities/pm/*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations/pm/*.{ts,js}')],
  synchronize: true
};

export const ProjectManagementConfig = config as TypeOrmModuleOptions;

export default new DataSource(config as DataSourceOptions);
