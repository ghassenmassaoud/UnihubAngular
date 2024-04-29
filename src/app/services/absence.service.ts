import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  private baseUrl = 'http://localhost:8081/api/absence/';
  

  constructor(private http: HttpClient) { }
  addAbsence(absence: any, classroom: number, student: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add?classroom=${classroom}&student=${student}`, absence);
  }
  updateAbsence(absenceId: number, updatedAbsence: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${absenceId}`, updatedAbsence);
  }
  deleteAbsence(numAbsence: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${numAbsence}`);
  }

  getAbsenceById(numAbsence: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get/${numAbsence}`);
  }

  getAllAbsences(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/all`);
  }
  searchAbsencesByStatus(status: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search/status/${status}`);
  }

  searchAbsencesByDate(date: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search/date/${date}`);
  }
  getStudentBySpeciality(speciality: string): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}getStudentBySpeciality/${speciality}`);
  }
}
