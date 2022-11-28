import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/entities/sso/user.entity';
import { ROLES_KEY } from 'src/utils/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  matchRoles(requireRoles: UserRole[], userRole: UserRole): boolean {
    return requireRoles.indexOf(userRole) > -1;
  }

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.get<UserRole[]>(
      ROLES_KEY,
      context.getClass()
    );

    if (!requireRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userInfo = this.jwtService.decode(
      request.headers.authorization?.replace('Bearer ', '')
    );

    return this.matchRoles(requireRoles, userInfo['role']);
  }
}
