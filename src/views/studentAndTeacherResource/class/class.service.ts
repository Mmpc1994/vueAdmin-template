import { http, IResponse, HTTP } from '../../../services/http_client.service';
import { Class } from './model/class.model';
import { TableService } from '../../../services/table.service';
import { ClassQueryDto } from './dto/class_query.dto';

export class ClassService {
  titles: any[] = TableService.setTableTitles(Class);

  async get_class_list(query: ClassQueryDto):Promise<IResponse<Class[]>> {
    const params = HTTP.encodeSearchParams(query)
    return await http.get<Class[]>('/classes?' + params)
  }

  async create_class(query: Class):Promise<IResponse<any>> {
    const school_id = 1;
    return await http.post<any>(`/admin/school/${school_id}/classes`, query)
  }
}

export const classService = new ClassService()