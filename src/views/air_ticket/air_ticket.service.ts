import { http, HTTP, IResponse } from '../../services/http_client.service';
import { PaginationResult, Pagination } from '../../dtos/pagination';
import { AirTicketQueryRequestDTO, AirTicketOrderResponseDTO} from './dtos/air_ticket_order.dto'
import { AirTicketChangeDTO } from './dtos/air_ticket_change.dto';

export const orderType = [{
  label: '所有订单',
  value: ''
}, {
  label: '等待支付',
  value: 10
}, {
  label: '支付成功',
  value: 11
}, {
  label: '申请改签',
  value: 21
}, {
  label: '取消订单',
  value: 19
}, {
  label: '出票完成',
  value: 15
}, {
  label: '申请退费',
  value: 20
}, {
  label: '退款完成',
  value: 18
}, {
  label: '当日乘机订单',
  value: 100
}]

export class AirTicketService {
  async getOrdersList(query: AirTicketQueryRequestDTO):Promise<IResponse<PaginationResult<AirTicketOrderResponseDTO>>> {
    return await http.post<PaginationResult<AirTicketOrderResponseDTO>>(`/airs/actions/queryList?pageNo=${query.pageNo}&pageSize=${query.pageSize}`, query);
  }

  async createChangeOrder(query: AirTicketChangeDTO, id: number):Promise<IResponse<any>> {
    return await http.put(`/airs/actions/update/${id}`, query)
  }

  async getAirOrderDetail(id: number):Promise<IResponse<AirTicketOrderResponseDTO>> {
    return await http.get<AirTicketOrderResponseDTO>(`/airs/actions/${id}`)
  }
}

export const airTicketService = new AirTicketService();
