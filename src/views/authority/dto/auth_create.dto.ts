export interface IAuth {
  name: string;
  description: string;
  l1_id?: number;
  l2_id?: number;
}

export class AuthCreateDto {
  type: string;
  privilege: IAuth;
}