import { Voyage } from '../models/voyage.model';

export class ITicketInfo {
  cardNo: string = '';
  cardType: string = '';
  passengerName: string = '';
  passengerType: string = '';
  salePrice: number | string = '';
  ticketNo: string = '';
  ticketPrice: number | string = '';
  ticketStatus: number | string = '';
}

export class AirTicketChangeDTO {
  changePayMoney: number | string = '';
  minutes: number | string = '';
  orderStatus: number = 22;
  serviceCharge: number | string  = '';
  isCabinLift: boolean = false;
  flightNo: string = ''
  ticketInfoList: ITicketInfo [] = [];
  voyages: Voyage[] = [];
}