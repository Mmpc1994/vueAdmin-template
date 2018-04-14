import isTableColumn  from '../../../../decorators/isTableColumn'

export class Major {
  /**
   * 专业名称
   */
  @isTableColumn({
    label: '专业名称'
  })
  name: string = '';

  /**
   * 描述
   */
  description: string = '';

  /**
   * 系主任管理员名称
   */
  @isTableColumn({
    label: '责任教师'
  })
  major_admin_name: string = '';

  /**
   * 系主任高管理员手机号
   */
  @isTableColumn({
    label: '责任教师联系方式'
  })
  major_admin_phone: string = '';

  /**
   * 学校id
   */
  school_id?: number;

  /**
   * 学校信息
   */
  school_info?: string;

  /**
   * 学生数量
   */
  @isTableColumn({
    label: '学生个数'
  })
  student_num?: number = 0;

  /**
   * 班级数量
   */
  @isTableColumn({
    label: '班级数目'
  })
  class_num?: number = 0

  id?: number = undefined;
}