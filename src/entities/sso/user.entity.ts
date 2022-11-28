import { shinning_sso } from 'src/utils/constants';
import { Column, Entity } from 'typeorm';
import { Base } from '../base';

export enum UserRole {
  Admin = 'admin',
  Staff = 'staff',
  Customer = 'customer'
}

@Entity({ name: 'user', database: shinning_sso })
export class User extends Base {
  @Column()
  fullname: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  isActive: boolean;

  @Column()
  role: UserRole;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  address: string;
}
