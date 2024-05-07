import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Classroom}from 'app/models/Classroom';
import { User } from 'app/models/User';
@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  private baseUrl = 'http://localhost:8081/api/classroom/'; 

  constructor(private http: HttpClient) { }

  addClassroom(classroomData: any,teacherId:number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}add?teacherId=` + teacherId, classroomData);
  }

  updateClassroom(classroomId: number, updatedClassroom: Classroom): Observable<Classroom> {
    return this.http.put<Classroom>(`${this.baseUrl}update/${classroomId}`, updatedClassroom);
  }

  getClassroom(numClassroom: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}get/${numClassroom}`);
  }

  removeClassroom(numClassroom: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}delete/${numClassroom}`);
  }

  getAllClassrooms(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}all`);
  }

  searchClassroomByNameOrTeacherName(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}search/${name}`);
  }

  affectStudentToClassroom(studentId: number, classroomId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}affectStudentToClassroom/${classroomId}/${studentId}`, {});
  }

  getEnrolledStudents(classroomId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}students/${classroomId}`);
  }
  removeStudentFromClassroom(classroomId: number, studentId: number) {
    return this.http.delete<any>(`${this.baseUrl}removeStudentFromClassroom/${classroomId}/${studentId}`);
  }
  getClassroomsForStudent(studentId: number): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(`${this.baseUrl}ClassStudents/${studentId}`);
  }

}
