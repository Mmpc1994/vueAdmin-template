import { http, IResponse, HTTP } from '../../services/http_client.service';
import { UserLoginDTO, UserLoginResponseDTO } from './dtos/user-login.dto';

export class UserService {
  async login(query: UserLoginDTO):Promise<IResponse<UserLoginResponseDTO>> {
    return await http.post<UserLoginResponseDTO>('user/login', query)
  }
}

export const userService = new UserService();