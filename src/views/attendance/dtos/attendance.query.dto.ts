import { Attendance } from '../model/attendance.model';

export class AttendanceResponseDTO {
  normal: number;
  normal_data: Attendance[];

  supplement: number;
  supplement_data: Attendance[];

  total: number;
  
  unapprove: number;
  unapprove_data: Attendance[];

  undo: number;
  undo_data: Attendance[];
}

export class AttendanceQueryDTO {
  class_id: number = 0
  signin_date: Date = new Date()
}