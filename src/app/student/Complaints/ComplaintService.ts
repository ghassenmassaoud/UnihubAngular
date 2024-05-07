import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Complaint } from './Complaint';


@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

    dataChange: BehaviorSubject<Complaint[]> = new BehaviorSubject<Complaint[]>([]);

      
    dialogData!: Complaint;

  private baseUrl = 'http://localhost:8081/api/api/complaints';

  constructor(private http: HttpClient) { }


  get data(): Complaint[] {
    return this.dataChange.value;
  }


  getDialogData() {
    return this.dialogData;
  }
   
  //////////////////CRUD

  addComplaint(complaint: Complaint): Observable<Complaint> {
    return this.http.post<any> ('http://localhost:8081/api/api/complaints', complaint);
  }
  
  updateComplaint(id: number, complaint: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, complaint);
  }

  deleteComplaint(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getComplaintById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getComplaintByType(complaintType: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/type/${complaintType}`);
  }

  getAllComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/All`);
  }

  getAllSeenComplaint(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/seen`);
  }

  getAllUnseenComplaint(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/unseen`);
  }
  send(msg: string): Observable<any> {
    const url = `http://localhost:8081/api/api/complaints/send`;
        return this.http.post<any>(url, msg);
  }

  setComplaintAsSeen(id: number): Observable<any> {
    const url = `http://localhost:8081/api/api/complaints/${id}/seen`;
        return this.http.post<Complaint>(url, null);
  }


}
  
