import isTableColumn from '@/decorators/isTableColumn.ts';

export default class User {
  @isTableColumn({
    label: '日期'
  })
  date: string = '';

  @isTableColumn({
    label: '姓名'
  })
  name: string = '';

  @isTableColumn({
    label: '学号'
  })
  id: number = 0;

  @isTableColumn({
    label: '入学年份'
  })
  begin: string = '';

  @isTableColumn({
    label: '毕业年份'
  })
  end: string = '';

  @isTableColumn({
    label: '联系电话'
  })
  tell: number = 0;

  @isTableColumn({
    label: '系(部)'
  })
  series: string = '';

  @isTableColumn({
    label: '专业'
  })
  work: string = '';

  @isTableColumn({
    label: '班级'
  })
  classroom: string = '';

}
