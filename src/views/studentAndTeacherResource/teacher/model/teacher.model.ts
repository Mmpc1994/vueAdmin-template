import isTableColumn  from '../../../../decorators/isTableColumn'

export class Teacher {
  /**
   * 唯一索引
   */
  id?: number;


  /**
   * 环信id
   */
  im_id?: number

   /**
   * 用户表
   */
  user_id?: number;
  
  /**
   * 学校id
   */
  school_id?: number;

  /**
   * 学校信息
   */

  school_info?: string;

  /**
   * 创建时间
   */
  create_time?: Date = new Date()

  /**
   * 类型
   */
  type: string = ''

  /**
   * 教师姓名
   */
  @isTableColumn({
    label: '教师名称'
  })
  name: string = ''

  /**
   * 手机号
   */
  @isTableColumn({
    label: '联系方式'
  })
  phone: string = ''

   /**
   * 身份证号
   */
  @isTableColumn({
    label: '身份证号'
  })
  id_num: number

  /**
   * 性别
   */
  @isTableColumn({
    label: '性别'
  })
  sex: string = '男'

  /**
   * 出身年份
   */
  birth_year: number = 0

  /**
   * 学历
   */
  @isTableColumn({
    label: '学历'
  })
  edu_exp: string = ''

  /**
   * 学位
   */
  @isTableColumn({
    label: '学位'
  })
  degree: string = ''

   /**
   * 出身日期
   */
  @isTableColumn({
    label: '出身日期'
  })
  birth_date: Date = new Date()

  /**
   * 岗位
   */
  post: string = ''

  /**
   * 职称
   */
  title: string = ''

  /**
   * 职业资格
   */
  @isTableColumn({
    label: '职业资格'
  })
  qualification: string = ''

  /**
   * 等级
   */
  @isTableColumn({
    label: '等级'
  })
  level: string = ''

  /**
   * 备注信息
   */
  description: string = ''

 
}