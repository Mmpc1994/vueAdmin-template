import isTableColumn from '@/decorators/isTableColumn.ts';

export default class Plan {
  @isTableColumn({
    label: '创建时间'
  })
  createAt: string = '';

  @isTableColumn({
    label: '创建人'
  })
  creator: string = '';

  @isTableColumn({
    label: '标题'
  })
  title: string = '';

  @isTableColumn({
    label: '范围'
  })
  range: string = '';

  @isTableColumn({
    label: '结束时间'
  })
  endTime: string = '';

  @isTableColumn({
    label: '开始时间'
  })
  startTime: string = '';

  @isTableColumn({
    label: '状态'
  })
  status: string = '';

  @isTableColumn({
    label: '当前处理机构'
  })
  org: string = '';

  @isTableColumn({
    label: '处理结果'
  })
  result: string = '';
}