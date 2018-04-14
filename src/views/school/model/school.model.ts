import isTableColumn  from '../../../decorators/isTableColumn'

export class School {

  /**
   * 学校名称
   */
  @isTableColumn({
    label: '学校名称'
  })
  name:string = '';

  /**
   * 学校类别
   */
  @isTableColumn({
    label: '学校类别'
  })
  type: string = '';

  /**
   * 管理员名称
   */
  @isTableColumn({
    label: '管理员名称'
  })
  admin_name: string = '';

  /**
   * 管理员手机号
   */
  @isTableColumn({
    label: '管理员手机号'
  })
  admin_phone: string = '';

  /**
   * 省份
   */
  @isTableColumn({
    label: '省份'
  })
  province: string = '';

  /**
   * 市区
   */
  @isTableColumn({
    label: '市区'
  })
  city: string = '';

  /**
   * 详细地址
   */
  address: string = '';

  /**
   * 合作方式
   */
  @isTableColumn({
    label: '合作方式'
  })
  cooperation_type: string = '';

  /**
   * 描述
   */
  description: string = ''

  /**
   * 创建时间
   */
  @isTableColumn({
    label: '创建时间'
  })
  create_time?: Date = new Date();

  /**
   * 状态
   */
  @isTableColumn({
    label: '状态'
  })
  is_deleted?: boolean = false;

  id?: string
}
