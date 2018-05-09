export class UserLoginDTO {
  phone: string = '';
  password: string = '';
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