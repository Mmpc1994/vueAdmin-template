import { Pagination } from '../../../dtos/pagination';
import { Voyage } from '../models/voyage.model';
import { Ticket } from '../models/ticket.model';
import { User } from '../../user/model/user.model';

export class AirTicketQueryRequestDTO extends Pagination {
  isAdmin = true;
  companyName = '';
  contactMobile = '';
  bigPnr: string = '';
  cardNo: string = '';
  depEndTime: Date | string = '';
  depStartTime: Date | string = '';
  flightNo: string = '';
  orderBeginTime: Date | string = '';
  orderEndTime: Date | string = '';
  orderStatus: number | string = '';
  passengerName: string = ''
  pnr: string = ''
  serialNumber: string = ''
  ticketNo: string = ''
  // userId: number = store.getters['userInfo'].id;
  orderTimeRange: Date[] = [];
  depTimeRange: Date[] = [];
  /**
   * 0 PNR小编码
   * 1 乘客姓名
   * 2 订单编号
   * 3 票号
   * 4 航班号
   * 5 证件号
   * 6 PNR大编码
   * 
   */
  hit: number = 0;
  keyword: string = '';
}

export class AirTicketOrderResponseDTO {
  agentMobile: string
  bigPnr: string
  contactMobile: string
  createTime: string
  discount: string
  id: number
  isBuyInsurance: boolean
  journeyInfo: boolean
  members: number
  orderId: string
  orderStatus: number
  orderStatusName: string
  orderType: string
  osi: string
  outTicketType: string
  outTimeBegin: string
  outTimeEnd: string
  pnr: string
  policyType: string
  refundMsg: string
  returnMsg: string
  returnRate: string
  serialNumber: string
  sourceStatus: number
  sourceType: string
  totalMoney: number
  totalPayMoney: number
  tradeNo: string
  userId: number
  user: User;
  oilTaxPrice: number;
  ticketPrice: number;
  tickets: Ticket[] = [];
  voyages: Voyage[] = [];
}