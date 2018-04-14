import { http, IResponse } from '../../services/http_client.service';
import { TreeNode } from './model/tree-node.model';
import { AuthCreateDto } from './dto/auth_create.dto';

export class AuthService {
  async get_platform_all_privilege():Promise<IResponse<TreeNode[]>> {
    return await http.get<TreeNode[]>('/admin/privileges') 
  }

  async create_new_privilege(query: AuthCreateDto):Promise<IResponse<any>> {
    return await http.post<any>('/admin/privileges', query)
  }
}

export const authService = new AuthService()