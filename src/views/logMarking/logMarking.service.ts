import { http, IResponse, HTTP } from '../../services/http_client.service';
import { TableService } from '../../services/table.service';
import { DateFormat, getWeekNumber } from '../../utils/index';
import { LogMarking } from './model/logMarking.model';
import { LogMarkingQueryDTO, LogMarkingSummaryQueryDTO, LogMarkingSummaryResponseDTO } from './dtos/logMarking.query.dto';
import { LogMarkingCommentDTO } from './dtos/logMarking.comment.dto';

export class LogMarkingService {
  titles: any[] = TableService.setTableTitles(LogMarking)

  async get_logMarking_summary(query: LogMarkingSummaryQueryDTO):Promise<IResponse<LogMarkingSummaryResponseDTO>> {
    let report_time: string = this.DateFormat(query);
    return await http.get<LogMarkingSummaryResponseDTO>(`/class/${query.class_id}/${query.r_type}/reportSummary?report_time=${report_time}`);
  }

  async get_logMarking_data(query: LogMarkingQueryDTO):Promise<IResponse<LogMarking[]>> {
    let report_time: string = this.DateFormat(query);
    return await http.get<LogMarking[]>(`/class/${query.class_id}/${query.r_type}/list?report_time=${report_time}&target_type=${query.target_type}`);
  }

  async comment(query: LogMarkingCommentDTO):Promise<IResponse<any>> {
    return await http.put(`/${query.r_type}/${query.report_id}/comment`, query);
  }

  private DateFormat(query: LogMarkingSummaryQueryDTO) {
    let report_time: string = ''
    switch (query.r_type) {
      case 'dailyReport':
        report_time = DateFormat(query.report_time, 'yyyy-MM-dd');
        break
      case 'weeklyReport':
        const week = getWeekNumber(query.report_time);
        report_time = query.report_time.getFullYear() + ':' + week;
        break;
      case 'monthlyReport':
        const month = query.report_time.getMonth() + 1;
        report_time = query.report_time.getFullYear() + ':' + month;
        break;
    }
    return report_time;
  }
}

export const logMarkingService = new LogMarkingService();