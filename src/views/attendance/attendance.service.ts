import { http, IResponse, HTTP } from '../../services/http_client.service';
import { Attendance } from './model/attendance.model';
import { TableService } from '../../services/table.service';
import { AttendanceQueryDTO, AttendanceResponseDTO } from './dtos/attendance.query.dto';
import { DateFormat } from '../../utils/index';

export class AttendanceService {
  titles: any[] = TableService.setTableTitles(Attendance);

  get_attendance_summary(query: AttendanceQueryDTO):Promise<IResponse<AttendanceResponseDTO>> {
    const signin_date = DateFormat(query.signin_date, 'yyyy-MM-dd');
    return http.get<AttendanceResponseDTO>(`/class/${query.class_id}/signinSummary/details?signin_date=${signin_date}`);
  }
}

export const attendanceService =  new AttendanceService();