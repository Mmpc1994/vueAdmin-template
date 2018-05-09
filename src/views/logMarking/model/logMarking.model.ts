import isTableColumn from '../../../decorators/isTableColumn';

export class LogMarking {
  class_id: number;

  class_name: string = '';

  comment_score: number = 0;

  comment_content?: string;

  comment_status: string = '';

  commenter_id?: number;

  @isTableColumn({
    label: '内容'
  })
  content: string = '';

  create_time?: Date;

  @isTableColumn({
    label: '反馈'
  })
  feedback: string = '';

  @isTableColumn({
    label: '心得'
  })
  harvest: string = '';

  id: number;

  report_date: Date;

  school_id: number;

  student_id: number;


  /**
   * 学生姓名
   */
  @isTableColumn({
    label: '学生姓名'
  })
  student_name: string;
}