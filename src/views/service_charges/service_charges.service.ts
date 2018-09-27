import { http, IResponse, HTTP } from '../../services/http_client.service';
import { ServiceChargesSaveDTO, ServiceChargeDTO } from './dtos/service_charges.dto';
import { Pagination, UserPaginationResult } from '../../dtos/pagination';

export class ServiceChargeService {
  async save(query: ServiceChargesSaveDTO) {
    return await http.post('/priceConfigurations', query)
  }

  async getList(query: Pagination):Promise<IResponse<UserPaginationResult<ServiceChargeDTO>>> {
    return await http.post<UserPaginationResult<ServiceChargeDTO>>('/priceConfigurations/actions/query?' + HTTP.encodeSearchParams(query), {});
  }

  async update(query: ServiceChargesSaveDTO) {
    return await http.put('/priceConfigurations/' + query.id, query)
  }

  async remove(id: number) {
    return await http.delete('/priceConfigurations/' + id);
  }
}

export const serviceChargeService = new ServiceChargeService()