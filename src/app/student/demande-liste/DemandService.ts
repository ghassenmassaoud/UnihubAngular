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
   
  //////////////////CRUD

  addDemand(demand: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, demand);
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
    return this.http.get<any>(`${this.baseUrl}/type/${demandType}`);
  }

  getAllDemands(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}
  
