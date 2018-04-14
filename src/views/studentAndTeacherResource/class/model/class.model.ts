import isTableColumn  from '../../../../decorators/isTableColumn'

export class Class {

  /**
   * 学生数量
   */
  @isTableColumn({
    label: '学生个数'
  })
  student_num: number = 0;

  @isTableColumn({
    label: '班级名称'
  })
  name: string = '';

  /**
   *  描述
   */
  @isTableColumn({
    label: '描述'
  })
  description: string = '';

  @isTableColumn({
    label: '班主任姓名'
  })
  class_admin_name: string = '';

  @isTableColumn({
    label: '班主任手机'
  })
  class_admin_phone: string = '';

  /**
   * 专业ID
   */

  major_id: number = 0;

  /**
   * 专业名称
   */
  @isTableColumn({
    label: '专业名称'
  })
  major_name: string = '';

  /**
   * 专业信息
   */

  major_info?: string

  /**
   * 学校id
   */

  school_id?: number

  /**
   * 学校信息
   */
  
  school_info?: string

   /**
   * 环信im 群组id
   */
  im_id?: number
}