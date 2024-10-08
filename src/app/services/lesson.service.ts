import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { D } from '@fullcalendar/core/internal-common';
import { Classroom } from 'app/models/Classroom';
import { Lesson } from 'app/models/Lesson';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private baseUrl = ' http://localhost:8081/api/lesson/';

  constructor(private http: HttpClient) { }
  // addLesson(lesson: Lesson, classroomId: number, file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('lesson', JSON.stringify(lesson));;
  //   formData.append('classroom', classroomId.toString());
  //   formData.append('file', file,file.name);

  //   return this.http.post<any>(`${this.baseUrl}add`,formData);
  // }
  
  addLesson(lessonName: string,visibility:string, classroom: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('lesson', lessonName);
    formData.append('Visibility', visibility);


    if (classroom !== null) {
      formData.append('classroom', classroom.toString());
    }
    if (file) {
      formData.append('file', file, file.name);
    }

    return this.http.post<any>(`${this.baseUrl}add`, formData);
  }
  updateLesson(lessonName: string, visibility: string, lessonId: number, file: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('lesson', lessonName);
    formData.append('Visibility', visibility);
    if (file) {
      formData.append('file', file);
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    const options = {
      headers: headers,
      params: new HttpParams().set('lessonId', lessonId.toString())
    };

    return this.http.put<any>(`${this.baseUrl}update/${lessonId}`, formData, options)
      .pipe(
        catchError(error => {
          return throwError('Failed to update lesson: ' + error.message);
        })
      );
  }
 

  getLesson(numLesson: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.baseUrl}get/${numLesson}`);
  }

  deleteLesson(numLesson: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}delete/${numLesson}`, { responseType: 'text' });
  }

  getAllLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.baseUrl}all`);
  }
  getLessonsByClassroom(classroomId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getLessonByCLassroom/${classroomId}`);
  }
  downloadLesson(fileName: string): Observable<HttpResponse<Blob>> { // Utilisez string comme type pour le nom du fichier
    const url = `${this.baseUrl}download/${fileName}`;
    return this.http.get(url, {
      responseType: 'blob',
      observe: 'response'
    });
  }


}
