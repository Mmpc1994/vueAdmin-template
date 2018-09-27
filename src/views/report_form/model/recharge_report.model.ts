export class RechargeReport {
  orderNo = 0;
  name: string;
  phone: string;
  cardType: string;
  cardNo: string;
  tradeType: string;
  amount = 0;
  remainingBalance = 0;
  createTime = new Date();
  tradeDetailInfoId: number;
}