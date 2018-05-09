import { http, IResponse, HTTP } from '../../services/http_client.service';
import { TableService } from '../../services/table.service';
import { DateFormat, getWeekNumber } from '../../utils/index';
import { InternshipSummaryQueryDTO } from './dtos/internshipSummary.query.dto';
import { InternshipPlanningQueryDTO } from './dtos/internshipPlanning.query.dto';
import { InternshipFinishQueryDTO } from './dtos/internshipFinish.query.dto';
import { InternShipApproveDTO } from './dtos/internshipFinishApprove.dto';
import { InternshipSummaryApproveDTO } from './dtos/internshipSummaryApprove.dto';
import { InternshipPlanning } from './planning/models/internshipPlanning.model';
import { InternshipFinish } from './finish/models/internshipFinish.model';
import { InternshipSummary } from './summary/models/internshipSummary.model';

export class InternShipService {
  titles: any[] = [];

  planningTitles: any[] = TableService.setTableTitles(InternshipPlanning);

  finishTitles: any[] = TableService.setTableTitles(InternshipFinish);

  summaryTitles: any[] = TableService.setTableTitles(InternshipSummary)
;
  async get_internship_summary(query: InternshipSummaryQueryDTO):Promise<IResponse<InternshipSummary[]>> {
    return await http.get<InternshipSummary[]>(`/school/${query.school_id}/internshipSummaries?${HTTP.encodeSearchParams(query)}`);
  }

  async approve_internship_summary(query: InternshipSummaryApproveDTO):Promise<IResponse<any>> {
    return await http.put(`/teacher/${query.teacher_id}/commenSummary/${query.summary_id}`, query);
  }

  async get_internship_planning(query: InternshipPlanningQueryDTO):Promise<IResponse<InternshipPlanning[]>> {
    const _q = Object.assign({}, query);
    delete _q.school_id;
    return await http.get<InternshipPlanning[]>(`/school/${query.school_id}/stuApplyJobs?${HTTP.encodeSearchParams(_q)}`)
  }

  async approve(query: any, teacher_id: number) {
    return await http.put(`/teacher/${teacher_id}/jdApprove/${query.id}?approve_status=${query.approve_status}`);
  }

  async get_internship_finish(query: InternshipFinishQueryDTO):Promise<IResponse<InternshipFinish[]>> {
    const q = Object.assign({}, query);
    delete q.school_id;
    return await http.get<InternshipFinish[]>(`/school/${query.school_id}/finishApplies?${HTTP.encodeSearchParams(q)}`);
  }

  async approve_internship_finish(query: InternShipApproveDTO):Promise<IResponse<any>> {
    return await http.put(`/teacher/${query.teacher_id}/finishApplyApprove/${query.finish_apply_id}?approve_status=${query.approve_status}`)
  }
}

export const internshipService = new InternShipService();