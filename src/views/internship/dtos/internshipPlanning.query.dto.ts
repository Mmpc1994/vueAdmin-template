export class InternshipPlanningQueryDTO {
  school_id: number;
  is_changed?: boolean ; // 是否变更
  approve_status?: string;
  teacher_id?: number;
  student_id?: number;
  class_id?: number;
}
