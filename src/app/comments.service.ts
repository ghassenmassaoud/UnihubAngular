import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from './models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private baseURL ="http://localhost:8081/api/comment/";

  constructor(private httpClient : HttpClient) { }
  getComments():
    Observable<Comment[]>{
      return this.httpClient.get<Comment[]>(this.baseURL + 'getall'); 
    }

}
