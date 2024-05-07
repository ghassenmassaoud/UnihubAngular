import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  private baseUrl = 'http://localhost:8081/api/absence/';
  

  constructor(private http: HttpClient) { }
  addAbsence(classroomId: number, studentId: number, absence: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}add?classroomId=${classroomId}&studentId=${studentId}`, absence);
  }

  updateAbsence(updatedAbsence: any, absenceId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}update/${absenceId}`, updatedAbsence);
  }

  getAbsence(absenceId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}get/${absenceId}`);
  }

  deleteAbsence(absenceId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}delete/${absenceId}`);
  }

  getAllAbsences(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}all`);
  }

  searchByStatus(status: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}search/status/${status}`);
  }

  searchByDate(date: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}search/date/${date}`);
  }

  getStudentBySpeciality(speciality: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getStudentBySpeciality/${speciality}`);
  }

  findAbsenceByStudentId(studentId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}student/${studentId}`);
  }
  getAbsenceByClassroom(classroomId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}classroom/${classroomId}`);
  }
}
