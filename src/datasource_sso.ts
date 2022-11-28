import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { shinning_sso } from './utils/constants';

const config = {
  name: 'ssoConnection',
  type: 'mysql',
  host: '45.77.251.90',
  port: 3306,
  username: 'root',
  password: '12345678x@X',
  database: shinning_sso,
  entities: [join(__dirname, 'entities/sso/*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations/sso/*.{ts,js}')],
  synchronize: true
};

export const SSOConfig = config as TypeOrmModuleOptions;

export default new DataSource(config as DataSourceOptions);
