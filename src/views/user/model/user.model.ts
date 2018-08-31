export class User {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: any[];
  balance: number;
  createTime: Date;
  credentialsNonExpired: boolean;
  email: string;
  enabled: boolean;
  id:number;
  lastPasswordResetDate: Date;
  name: string;
  openId: string;
  password: string;
  phone: string;
  roles: any[];
  username: string;
}