import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommerceConfig } from 'src/datasource_com';
import { ProjectManagementConfig } from 'src/datasource_pm';
import { SSOConfig } from 'src/datasource_sso';

@Module({
  imports: [
    TypeOrmModule.forRoot(CommerceConfig),
    TypeOrmModule.forRoot(SSOConfig)
    // TypeOrmModule.forRoot(ProjectManagementConfig)
  ]
})
export class DatabaseModule {}
