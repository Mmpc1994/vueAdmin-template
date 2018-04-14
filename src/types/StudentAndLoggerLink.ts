import isTableColumn from '@/decorators/isTableColumn.ts';
import Student from './Student.ts';

// 未批阅的日志
export class StudentAndLoggerWaitRemarkLink extends Student {
  @isTableColumn({
    label: '已打回'
  })
  back: boolean = false;

  @isTableColumn({
    label: '最近提交时间'
  })
  lastModifyTime: string = '';

  @isTableColumn({
    label: '提交状态'
  })
  status: string = '';

  @isTableColumn({
    label: '累计提交(篇)'
  })
  number: number = 0;
}

// 已经批阅的日志 感觉不应该使用继承
export class StudentAndLoggerAlreadyRemarkLink extends Student {
  @isTableColumn({
    label: '提交时间'
  })
  submitTime: string = '';

  @isTableColumn({
    label: '批阅时间'
  })
  remarkTime: string = '';

  @isTableColumn({
    label: '批阅结果'
  })
  result: string = '';

  @isTableColumn({
    label: '批阅老师'
  })
  teacher: string = '';

  @isTableColumn({
    label: '最近提交时间'
  })
  lastModifyTime: string = '';

  @isTableColumn({
    label: '提交状态'
  })
  status: string = '';

  @isTableColumn({
    label: '累计提交(篇)'
  })
  number: number = 0;

}

/**
 * 未提交的日志
 */
export class StudentAndLoggerWaitSubmitLink extends Student {
  @isTableColumn({
    label: '最近提交时间'
  })
  lastModifyTime: string = '';

  @isTableColumn({
    label: '累计提交(篇)'
  })
  number: number = 0;

  @isTableColumn({
    label: '提醒提交'
  })
  warn: number = 0;
}