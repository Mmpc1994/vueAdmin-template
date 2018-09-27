export class ServiceChargesSaveDTO {
  isActive = false;
  money = 0;
  // 0明 1 暗
  type = 0;
  usageType: string = '';
  id?: number;
}

export class ServiceChargeDTO {
  createTime: Date;
  id: number;
  isActive: boolean;
  money: number;
  type: number;
  updateTime?: Date;
  usageType: string;
}