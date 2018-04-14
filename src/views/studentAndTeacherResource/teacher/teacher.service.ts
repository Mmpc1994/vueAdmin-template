import { Teacher } from './model/teacher.model'
import { TableService } from '../../../services/table.service';
import { TeacherQueryDto } from './dto/teacher_query.dto';
import { IResponse, http, HTTP } from '../../../services/http_client.service';

const school_id = 1
export class TeacherService {
  titles: any = TableService.setTableTitles(Teacher)

  async get_teacher_list(query: TeacherQueryDto):Promise<IResponse<Teacher[]>> {
    const params = HTTP.encodeSearchParams(query)
    return await http.get<Teacher[]>(`/admin/school/${school_id}/teachers` + params)
  }

  async get_teacher_info(id: number):Promise<IResponse<Teacher>>  {
    return await http.get<Teacher>(`/school/${school_id}/teacher/` + id)
  }

  async add_teacher(query: Teacher):Promise<IResponse<any>>  {
    return await http.post<any>(`/admin/school/${school_id}/teachers`, query)
  }

  async import_teacher() {

  }
};

export const teacherService = new TeacherService()

