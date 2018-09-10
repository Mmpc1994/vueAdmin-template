import { http, IResponse, HTTP } from '../../services/http_client.service';
import { UserLoginDTO, UserLoginResponseDTO, UserSignUpDTO } from './dtos/user-login.dto';
import { User } from './model/user.model';

export class UserService {
  async login(query: UserLoginDTO):Promise<IResponse<UserLoginResponseDTO>> {
    return await http.get<UserLoginResponseDTO>('/users/actions/login', {
      headers: query
    })
  }

  async send(phone: string):Promise<IResponse<any>> {
    return await http.get('/users/codes/actions/send?phone=' + phone);
  }

  async signUp(query: UserSignUpDTO):Promise<IResponse<any>> {
    return await http.post('/users', query);
  }

  async getUserInfo():Promise<IResponse<User>> {
    return await http.get<User>('/users')
  }

  async update(query: User):Promise<IResponse<any>> {
    return await http.put(`/users/${query.id}`, query)
  }
}

export const userService = new UserService();