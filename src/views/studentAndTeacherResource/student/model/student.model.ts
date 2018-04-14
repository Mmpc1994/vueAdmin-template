import isTableColumn  from '../../../../decorators/isTableColumn'

export class Student {
  /**
   * 学号 校内
   */
  school_num: string = '';

  /**
   * 姓名
   */
  @isTableColumn({
    label: '学生姓名'
  })
  name: string = '';

  /**
   * 手机号
   */
  @isTableColumn({
    label: '联系方式'
  })
   phone: string = '';

   /**
    * 实时通信账号
    */
   im_id?: number;

   /**
    * 出身日期
    */
   @isTableColumn({
    label: '出身日期'
  })
   birth_date: Date = new Date()

   /**
    * 性别
    */
   @isTableColumn({
    label: '性别'
  })
   sex: string = '男';

   /**
    * 名族
    */
   nation: string = '汉'

   /**
    * 身份证号
    */
   @isTableColumn({
    label: '身份证号'
  })
   id_num: string = '';

   /**
    * 薪水
    */
   @isTableColumn({
    label: '工资'
  })
   salary: number = 0;

   /**
    * 签到目标地址经纬度
    */
   signin_des_coordinate: string = '';

   /**
    * 入学日期
    */
   entrance_date: Date = new Date();

   /**
    * 学生类型
    */
   student_type: string = '';

   /**
    * 学制年份
    */
   school_year: number = 5;

   /**
    * 政治面貌
    * 群众 or 团员 or 党员
    */
   politics: string = '群众'

   /**
    * 毕业学校
    */
   middle_school: string = '';

   /**
    * 监护人姓名
    */
   guarder_name: string = ''

   /**
    * 监护人电话
    */
   guarder_phone: string = ''

   /**
    * 户口所在省份
    */
   hukou_province: string = ''

   /**
    * 户口所在市区
    */
   hukou_city: string = ''

   /**
    * 户口所在区县
    */
   hukou_county: string = ''

   /**
    * 详细地址
    */
   hukou_address: string = ''

   /**
    * 现居所在省份
    */
   current_province?: string

   /**
    * 现居所在市区
    */
   current_city?: string

   /**
    * 现居所在区县
    */
   current_county?: string

   /**
    * 现居详细地址
    */
   current_address?: string

   /**
    * 
    */
   user_id?: number;

   /**
    * 所在专业
    */
   major_id?: number;

   /**
    * 专业名称
    */
   major_name?: string;

   /**
    * 专业信息
    */
   major_info?: string

   /**
    * 班级
    */
   class_id?: number;

   /**
    * 班级名称
    */
   class_name?: string

   /**
    * 班级信息
    */
   class_info?: string

   /**
    * 学校
    */
   school_id?: number

   /**
    * 学校信息
    */
   school_info?: string 

   /**
    * 创建时间
    */
   create_time?: Date = new Date()

   id?: number;
}