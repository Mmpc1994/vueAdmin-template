import { Pagination } from '../../../dtos/pagination';

export class ReportQueryDTO extends Pagination {
  serialNo: string = '';
  phone = '';
  paymentType = '';
  startDate = '';
  endDate = '';
}