import { http, IResponse, HTTP } from '../../../services/http_client.service';
import { Student } from './model/student.model'
import { TableService } from '../../../services/table.service';
import { StudentQueryDto } from './dto/student_query.dto'

const school_id = 1
export class StudentService {
  titles: any = TableService.setTableTitles(Student)

  async get_student_list(query: StudentQueryDto):Promise<IResponse<Student[]>> {
    query.school_id = school_id;
    const params = HTTP.encodeSearchParams(query);
    return await http.get<Student[]>(`/students?` + params)
  }

  async get_student_info(id: number):Promise<IResponse<Student>> {
    return await http.get<Student>(`/school/${school_id}/student/` + id)
  }

  async add_student(query: Student):Promise<IResponse<any>> {
    const major_id = (query as any).preconditions[0]
    const class_id = (query as any).preconditions[1]
    
    const _student: Student = new Student()
    Object.assign(_student, query)
    delete (_student as any).preconditions;
    return await http.post<any>(`/admin/school/${school_id}/major/${major_id}/class/${class_id}/students`, _student)
  }

  async import_teacher() {

  }
};

export const studentService = new StudentService()
