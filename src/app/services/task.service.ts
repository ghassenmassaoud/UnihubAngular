import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'app/models/Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = ' http://localhost:8081/api/task/';

  constructor(private http: HttpClient) { }
  addTask(taskDescription: string, deadline: Date | string, classroomId: number , file: File | null): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('TaskDescription', taskDescription);
    
    if (deadline instanceof Date) {
      // Utilisez formatDate pour formater la date en chaîne ISO8601
      formData.append('Deadline', formatDate(deadline, 'yyyy-MM-ddTHH:mm:ss', 'en-US'));
    } else {
      formData.append('Deadline', deadline); // Assuming deadline is already formatted correctly
    }
    
    
    if (classroomId !== null) {
      formData.append('classroomId', classroomId.toString());
    }
    if (file) {
      formData.append('file', file, file.name);
    }
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    
    return this.http.post<any>(`${this.baseUrl}add`, formData);
  }

  updateTask(taskId: number, taskDescription: string, deadline: Date | string, file: File | null): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('taskId', taskId.toString());
    formData.append('TaskDescription', taskDescription);
    if (deadline instanceof Date) {
      // Utilisez formatDate pour formater la date en chaîne ISO8601
      formData.append('Deadline', formatDate(deadline, 'yyyy-MM-ddTHH:mm:ss', 'en-US'));
    } else {
      formData.append('Deadline', deadline); // Assuming deadline is already formatted correctly
    }
    
    if (file) {
      formData.append('file', file, file.name);
    }

    const headers = new HttpHeaders({
      // Vous pouvez ajouter des headers personnalisés si nécessaire
    });

    return this.http.put<any>(`${this.baseUrl}update`, formData, { headers });
  }
  getTask(numTask: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}get/${numTask}`);
  }

  // Méthode pour supprimer une tâche par son ID
  removeTask(numTask: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}delete/${numTask}`);
  }

  // Méthode pour récupérer toutes les tâches
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}all`);
  }

  // Méthode pour rechercher des tâches par statut
  searchTaskByStatus(status: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}search/${status}`);
  }

  // Méthode pour rechercher des tâches par date
  searchTaskByDate(date:Date | string): Observable<any> {
    const formData: FormData = new FormData();
    if (date instanceof Date) {
      // Utilisez formatDate pour formater la date en chaîne ISO8601
      formData.append('Deadline', formatDate(date, 'yyyy-MM-ddTHH:mm:ss', 'en-US'));
    } else {
      formData.append('Deadline', date); // Assuming deadline is already formatted correctly
    }
    
    return this.http.get<any>(`${this.baseUrl}search/byDate/${date}`);
  }

  // Méthode pour répondre à une tâche (avec un fichier optionnel)
  replyTask(taskId: number, file: File): Observable<Task> {
    const formData = new FormData();
    formData.append('taskId', taskId.toString());
    if (file) {
      formData.append('file', file);
    }
    return this.http.post<Task>(`${this.baseUrl}replyTask`, formData);
  }

  // Méthode pour évaluer une tâche
  evaluateTask(taskId: number, mark: number): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}evaluateTask/${taskId}`, { mark });
  }
  getTasksByClassroom(classroomId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getTaskByCLassroom/${classroomId}`);
  }
}
