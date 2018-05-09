export class LogMarkingQueryDTO {
  class_id: number = 0
  r_type: string = 'dailyReport'  // (`dailyReport` or `weeklyReport` or `monthlyReport`)
  report_time: Date = new Date();
  target_type: string  = 'done' ;// done or undo
}

export class LogMarkingSummaryQueryDTO {
  class_id: number = 0;
  r_type: string = 'dailyReport';
  report_time: Date = new Date();
}

export class LogMarkingSummaryResponseDTO {
  total: number = 0;
  normal: number = 0;
  supplement: number = 0;
  undo: number = 0;
  marked: number = 0;
  unmark: number = 0;
}