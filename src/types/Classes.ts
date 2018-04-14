import isTableColumn from '@/decorators/isTableColumn.ts';

export default class Classes {
  @isTableColumn({
    label: '名称'
  })
  name: string = '';

  @isTableColumn({
    label: '毕业年份'
  })
  graduate: string = '';

  @isTableColumn({
    label: '学生人数'
  })
  numbers: number = 0;

  @isTableColumn({
    label: '实习中人数'
  })
  internship: number = 0;

  @isTableColumn({
    label: '实习指导老师'
  })
  teacher: string = '';
}