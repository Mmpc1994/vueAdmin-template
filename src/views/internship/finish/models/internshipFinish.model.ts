import isTableColumn  from '../../../../decorators/isTableColumn'

export class InternshipFinish {
  /**
   * 学生姓名
   */
  @isTableColumn({
    label: '学生姓名'
  })
  student_name: string = '';

  /**
   * 审核状态
   */
  // @isTableColumn({
  //   label: '审核状态'
  // })
  approve_status: string = '';

  /**
   * 班级
   */

  @isTableColumn({
    label: '班级'
  })
  class_name: string = '';

  approve_teacher_id?: number;

  approve_teacher_name?: string;

  class_id: number;

  create_time: Date;

  /**
   * 描述
   */
  @isTableColumn({
    label: '描述'
  })
  description: string = '';

  id: number;

  school_id: number;

  student_apply_job_id: number;

  // @isTableColumn({
  //   label: '工作名称'
  // })
  // student_apply_job_name: string;

  update_time: Date;
}