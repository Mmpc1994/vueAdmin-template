import { http, IResponse, HTTP } from '../../services/http_client.service';
import { DailyJournal, WeeklyJournal, MonthlyJournal } from './model/journal.model';
import { Journal } from './model/journal.model';
import { getUserInfo } from '../../utils/auth';


export class JournalService {
  userId: number;
  constructor() {
    this.userId = getUserInfo().user.id;
  }
  
  async submitDailyJournal(query: DailyJournal):Promise<IResponse<any>> {
    return await http.post<any>(`/teacher/${this.userId}/dailyReports`, query);
  }

  async submitWeeklyJournal(query: WeeklyJournal):Promise<IResponse<any>> {
    return await http.post<any>(`/teacher/${this.userId}/weeklyReports`, query);
  }

  async submitMoothlyJournal(query: MonthlyJournal):Promise<IResponse<any>> {
    return await http.post<any>(`/teacher/${this.userId}/monthlyReports`, query);
  }

  async getDailyJournal():Promise<IResponse<Journal[]>> {
    return await http.get<Journal[]>(`/teacher/${this.userId}/dailyReports`);
  }

  async getWeeklyJournal():Promise<IResponse<Journal[]>> {
    return await http.get<Journal[]>(`/teacher/${this.userId}/weeklyReports`);
  }

  async getMoothlyJournal():Promise<IResponse<Journal[]>> {
    return await http.get<Journal[]>(`/teacher/${this.userId}/monthlyReports`);
  }
}

export const journalService = new JournalService()