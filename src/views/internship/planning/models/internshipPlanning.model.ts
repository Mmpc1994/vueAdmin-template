import isTableColumn  from '../../../../decorators/isTableColumn'

export class InternshipPlanning {
  approve_status: string;
  class_id: number;

  @isTableColumn({
    label: '班级'
  })
  class_name: string = '';
  company_id: number;

  @isTableColumn({
    label: '实习企业名称'
  })
  company_name: string = '';

  create_time: Date;

  @isTableColumn({
    label: '描述'
  })
  description: string;
  id: number;
  is_changed: boolean;
  jd_info_id: number;

  @isTableColumn({
    label: '工作状态'
  })
  job_status: string = '';

  live_school: string = '';

  @isTableColumn({
    label: '工资'
  })
  salary: number = 0;
  school_id: number;
  student_id: number;

  @isTableColumn({
    label: '学生姓名'
  })
  student_name: string = '';

  update_time: Date;
  live_address?: string;
  approve_teacher_id?: number;
  approve_teacher_name?: string;
  change_from_id?: number;
  change_to_id?: number;

}