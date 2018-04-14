import { http, IResponse, HTTP } from '../../../services/http_client.service';
import { Major } from './model/major.model';
import { TableService } from '../../../services/table.service';
import { MajorQueryDto } from './dto/major_query.dto';

const school_id = 1;
export class MajorService {
  titles: any[] = TableService.setTableTitles(Major);

  async get_major_list(query: MajorQueryDto):Promise<IResponse<Major[]>> {
    const params = HTTP.encodeSearchParams(query)
    return await http.get<Major[]>(`/admin/school/${school_id}/majors?${params}`)
  }

  async create_major(query: Major):Promise<IResponse<any>> {
    return await http.post<any>(`/admin/school/${school_id}/majors`, query)
  }

  async import_major(query: any):Promise<IResponse<any>> {
    return await http.post<any>(`/admin/school/${school_id}/majors/import`, query)
  }
}

export const majorService = new MajorService()