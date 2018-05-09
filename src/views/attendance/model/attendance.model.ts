import isTableColumn from '../../../decorators/isTableColumn';

export class Attendance {
  class_id: number;
  create_time: Date;
  @isTableColumn({
    label: '描述'
  })
  description: string = ''
  id: number;
  is_supplement: boolean;
  @isTableColumn({
    label: '签到地址'
  })
  location_address: string = ''
  location_coordinate: string;
  signin_date: Date;
  status: string;
  student_id: number;
  @isTableColumn({
    label: '学生姓名'
  })
  student_name: string = '';
}