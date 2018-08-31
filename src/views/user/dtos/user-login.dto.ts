export class UserLoginDTO {
  userName: string = '';
  password: string = '';
}


export class UserSignUpDTO {
  code:string = ''
  companyMobile:string = ''
  companyName:string = ''
  email:string = ''
  name:string = ''
  password:string = ''
  passwordConfirm: string = ''
  phone:string = ''
  roles: string[] = ['ROLE_CUSTOMER']
  status: number;
}

export interface IUser {
  create_time: Date;
  id: number;
  last_login_time: Date;
  login_times: number;
  name: string;
  password: string;
  phone: string;
  role: string;
  school_id: number;
  status?: string;
}

export class UserLoginResponseDTO {
  role: string = '';
  token: string = '';
  user: IUser;
}