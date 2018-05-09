export class Journal {
  id?: number;
  
  /**
   * 内容
   */
  content: string = '';

  /**
   * 总结
   */
  harvest: string = '';

  /**
   * 反馈
   */
  feedback: string = '';

}

export class DailyJournal extends Journal {
  report_date: Date = new Date();
}

export class WeeklyJournal extends Journal {
  /**
   * 报道时间
   */
  report_week: string = '';

  /**
   * 开始时间
   */
  begin_date: string = '';

  /**
   * 结束时间
   */
  end_date: string = '';
}

export class MonthlyJournal extends Journal {
  /**
   * 报道月份
   */
  report_month: string = '';

  /**
   * 开始时间
   */
  begin_date: string = '';

  /**
   * 结束时间
   */
  end_date: string = '';

  /**
   * 计划
   */
  next_plan: string = '';
}