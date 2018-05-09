export class InternshipFinishQueryDTO {
  school_id: number = 0;
  approve_status?: string = '未审核';
  teacher_id?: number;
  student_id?: number;
  class_id?: number = 0;
}