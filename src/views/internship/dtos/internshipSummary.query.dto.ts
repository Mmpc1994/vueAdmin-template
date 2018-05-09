export class InternshipSummaryQueryDTO {
  school_id: number;
  comment_status?: string = '未批阅';
  teacher_id?: number;
  student_id?: number;
  class_id?: number = 0;
}