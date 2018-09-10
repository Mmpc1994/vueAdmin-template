import { Pagination } from '../../../dtos/pagination';

export class AgentQueryRequestDTO extends Pagination {
  roles = ['ROLE_CUSTOMER'];
  companyMobile = '';
  companyName = '';
}