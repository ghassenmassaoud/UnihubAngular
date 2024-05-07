import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Demand } from './Demand';


@Injectable({
  providedIn: 'root'
})
export class DemandsService {

    dataChange: BehaviorSubject<Demand[]> = new BehaviorSubject<Demand[]>([]);

      
    dialogData!: Demand;

  private baseUrl = 'http://localhost:8081/api/demands';

  constructor(private http: HttpClient) { }


  get data(): Demand[] {
    return this.dataChange.value;
  }


  getDialogData() {
    return this.dialogData;
  }
   

  send(msg: string): Observable<any> {
    const url = `http://localhost:8081/api/demands/send`;
        return this.http.post<any>(url, msg);
  }
  //////////////////CRUD

  addDemand(demand: Demand): Observable<Demand> {
    return this.http.post<any> (this.baseUrl, demand);
  }
  
  updateDemand(id: number, demand: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, demand);
  }

  deleteDemand(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getDemandById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getDemandByType(demandType: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/DemandType/${demandType}`);
  }

  getAllDemands(): Observable<any> {
    return this.http.get<Demand>(`${this.baseUrl}/All`);
  }

  getAllSeenDemands(): Observable<Demand[]> {
    return this.http.get<Demand[]>(`${this.baseUrl}/seen`);
  }

  getAllUnseenDemands(): Observable<Demand[]> {
    return this.http.get<Demand[]>(`${this.baseUrl}/unseen`);
  }

  getNumberOfDemands(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  setDemandAsSeen(id: number): Observable<any> {
    const url = `http://localhost:8081/api/demands/${id}/seen`;
        return this.http.post<Demand>(url, null);
  }


  countWeeklyDemands(): Observable<number> {
    const currentDate = new Date();
    const currentWeek = this.getWeekNumber(currentDate);
    const url = `${this.baseUrl}/count/weekly`;
    return this.http.get<number>(url);
  }

  private getWeekNumber(date: Date): number {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const timeDiff = date.getTime() - oneJan.getTime();
    const dayOfYear = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const weekNumber = Math.ceil(dayOfYear / 7);
    return weekNumber;
  }



  countDailyDemands(): Observable<number> {
    const currentDate = new Date();
    const url = `${this.baseUrl}/count/daily`;
    return this.http.get<number>(url);
  }



  countMonthlyDemands(): Observable<number> {
    const url = `${this.baseUrl}/count/monthly`;
    return this.http.get<number>(url);
  }

  
  getNumberOfSeenDemands(): Observable<number> {
    const url = `${this.baseUrl}/count/seen`;
    return this.http.get<number>(url);
  }

  getNumberOfUnseenDemands(): Observable<number> {
    const url = `${this.baseUrl}/count/unseen`;
    return this.http.get<number>(url);
  }


}
  
