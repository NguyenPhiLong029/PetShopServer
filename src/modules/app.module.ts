import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { ProjectManagementModule } from './pm.module';
import { AdminModule } from './admin.module';
import { DatabaseModule } from './db.module';
import { CommerceModule } from './com.module';
import { RouterModule } from '@nestjs/core';
import { FileController } from 'src/controllers/file.controller';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule
      },
      {
        path: 'com',
        module: CommerceModule
      }
    ]),
    AdminModule,
    CommerceModule
    // ProjectManagementModule,
  ],
  controllers: [FileController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    JwtService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
