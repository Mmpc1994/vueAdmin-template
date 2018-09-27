export class CreditCardReport {
  orderNo = 0;
  name = '';
  phone = '';
  serialNo = '';
  bankName = '';
  bankCardNo = '';
  bankAccount = '';
  deposit = '';
  depositAddress = '';
  tradeType = '';
  balancePay: string;
  balanceAmount: number;
  wxPay: string;
  wxAmount: number;
  unionPay: string;
  unionAmount: number;
  // paymentType = '';
  // amount = 0;
  poundage = 0;
  createTime = new Date();
}