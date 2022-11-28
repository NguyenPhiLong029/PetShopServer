import { UserRole } from 'src/entities/sso/user.entity';

export default class RegisterDto {
  fullname: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  role: UserRole;
}
