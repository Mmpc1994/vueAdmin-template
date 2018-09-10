import { http, HTTP, IResponse } from '../../services/http_client.service';
import { PaginationResult, Pagination , UserPaginationResult} from '../../dtos/pagination';
import { AgentQueryRequestDTO } from './dtos/agent_query.dto';
import { User } from '../user/model/user.model';


export class AgentService{
  async getAgentList(query: AgentQueryRequestDTO):Promise<IResponse<UserPaginationResult<User>>> {
    return await http.post<UserPaginationResult<User>>('/users/actions/query?' + HTTP.encodeSearchParams(query), query);
  }
}

export const agentService = new AgentService();