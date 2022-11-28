import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/entities/sso/user.entity';
import { ROLES_KEY } from 'src/utils/constants';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
