export class TradeDetailQueryDTO {
  serialNo: string = '';
  isPayment = false;
}

export class TradeDetailResponseDTO {
  createTime: Date;
  id: number;
  price: number;
  productName: string;
  usageDetail: string;
  usageId: number;
}