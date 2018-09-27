import { Pagination } from '../../../dtos/pagination';

export class ConsumeQueryDTO extends Pagination {
  orderType: string = 'air';
  cunsumptionType: number = 0;
  productName: string = '';
  serialNo: string = '';
  phone: string = '';
  ticketNo: string = '';
  passengerName: string = '';
  carrierch: string = '';
  flightNo: string = '';
  country: string  = '';
  usageName: string = '';
  paymentType: string = '';
  startDate: string = '';
  endDate: string = '';
}