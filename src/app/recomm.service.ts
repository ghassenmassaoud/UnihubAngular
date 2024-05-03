import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommService {
  private baseURL ="http://localhost:8081/api/recom/";


  constructor(private httpClient : HttpClient) {
    
   }
   getRecomm(userId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}user/${userId}`);
  }
}
