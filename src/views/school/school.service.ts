import { http, IResponse, HTTP } from '../../services/http_client.service';
import { School } from './model/school.model';
import { TableService } from '../../services/table.service';
import { SchoolQueryDto } from './dto/school_query.dto';

export class SchoolService {
  titles: any[] = TableService.setTableTitles(School)

  async get_school_list(query: SchoolQueryDto):Promise<IResponse<School[]>> {
    const params = HTTP.encodeSearchParams(query);
    return await http.get<School[]>('/admin/schools?' + params)
  }

  async add_school(query: School):Promise<IResponse<any>> {
    return await http.post<any>('/admin/schools', query)
  }

  async get_school_by_id(id: string):Promise<IResponse<School>> {
    return await http.get<any>('/admin/school/' + id )
  }
};

export const schoolService = new SchoolService()