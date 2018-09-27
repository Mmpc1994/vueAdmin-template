import { http, IResponse, HTTP } from '../../services/http_client.service';
import { Pagination, PaginationResult, UserPaginationResult } from '../../dtos/pagination';
import { ReportQueryDTO } from './dtos/report_query.dto';
import { CreditCardReport } from './model/credit_card_report.model';
import { RechargeReport } from './model/recharge_report.model';
import { ConsumeQueryDTO } from './dtos/consume.dto';
import { ConsumeReport } from './model/consume_report.model';
import { RefundReport } from './model/refund_report.model';
import { TradeDetailQueryDTO, TradeDetailResponseDTO } from './dtos/trade_detail.dto';
import { RechargeDetailDTO } from './dtos/recharge_detail';




export class ReportService {
  async getRechargeReports(query: ReportQueryDTO):Promise<IResponse<PaginationResult<RechargeReport>>> {
    return await http.get<PaginationResult<RechargeReport>>('/finance-reports/recharge-records/actions/list?' + HTTP.encodeSearchParams(query));
  } 

  async getCreditCardReports(query: ReportQueryDTO):Promise<IResponse<PaginationResult<CreditCardReport>>> {
    return await http.get<PaginationResult<CreditCardReport>>('/finance-reports/repayment-records/actions/list?' + HTTP.encodeSearchParams(query));
  }

  async getConsumeReports(query: ConsumeQueryDTO):Promise<IResponse<PaginationResult<ConsumeReport>>> {
    return await http.get<PaginationResult<ConsumeReport>>('/finance-reports/consumption-records/actions/list?' + HTTP.encodeSearchParams(query));
  }

  async getRefundoReports(query: ConsumeQueryDTO):Promise<IResponse<PaginationResult<RefundReport>>> {
    return await http.get<PaginationResult<RefundReport>>('/finance-reports/refund-records/actions/list?' + HTTP.encodeSearchParams(query));
  }

  async getTradeDetail(query: TradeDetailQueryDTO):Promise<IResponse<TradeDetailResponseDTO[]>> {
    return await http.get<TradeDetailResponseDTO[]>('/finance-reports/trade-detail-info/actions/list?' + HTTP.encodeSearchParams(query))
  }

  async getRechargeDetail(id: number):Promise<IResponse<RechargeDetailDTO[]>> {
    return await http.get<RechargeDetailDTO[]>('/finance-reports/gift-cards/actions/list?tradeDetailInfoId=' + id);
  }
}

export const reportService = new ReportService()