import isTableColumn  from '../../../../decorators/isTableColumn'

export class InternshipSummary {
  @isTableColumn({
    label: '学生姓名'
  })
  student_name: string = ''
  class_id: number;

  @isTableColumn({
    label: '班级'
  })
  class_name: string = ''

  comment_content: string;

  comment_teacher_id?: number;

  comment_teacher_name?: string;

  create_time: Date;

  
  description?: string;

  @isTableColumn({
    label: '经验'
  })
  experiences: string = ''

  id: number;

  @isTableColumn({
    label: '问题'
  })
  problems: string = ''

  school_id: number;

  student_apply_job_id: number;

  student_id: number;

  @isTableColumn({
    label: '状态'
  })
  comment_status: string = '未批阅';

  update_time: Date;
}