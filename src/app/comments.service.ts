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
      return this.httpClient.get<Comment[]>(this.baseURL + 'getallcomments'); 
    }
    getCommenttById(commentId: number): Observable<any> {
      return this.httpClient.get<any>(`${this.baseURL}getcomment?commentId=${commentId}`);
    }

    getCommentsForPost(postId: number): Observable<any> {
      const url = `${this.baseURL}comments?postId=${postId}`; // URL de l'API pour récupérer les commentaires d'un post spécifique
      return this.httpClient.get<any>(url);
    }

    ReportComment(commentId: number): Observable<any> {
      const url = `${this.baseURL}mark-reported?commentId=${commentId}`;
      return this.httpClient.post<any>(url, null);
    }
    
    UnReportComment(commentId: number): Observable<any> {
      const url = `${this.baseURL}unmark-reported?commentId=${commentId}`;
      return this.httpClient.post<any>(url, null);
    }
    
    deleteComment(commentId:number):Observable<any>{
      return this.httpClient.delete<any>(`${this.baseURL}deletecomment?commentId=${commentId}`);
    }

 
    editComment(commentId: number, postId: number, commentData: FormData): Observable<any> {
      return this.httpClient.put<any>(`${this.baseURL}updatecomment?commentId=${commentId}&postId=${postId}`,commentData);
    }

    addComment(comment: Comment, postId: number, userId: number): Observable<any> {
      return this.httpClient.post<any>(`${this.baseURL}addcomment?userId=${userId}&postId=${postId}`, comment );
    }
    // addComment(comment:any,userId: number, postId: number ): Observable<any> {
    //   const url = `${this.baseURL}addcomment?userId=${userId}&postId=${postId}&${comment}`;
    //   return this.httpClient.post<any>(url, {});
    // }

    replyComment(parentId:number,userId:number,postId: number): Observable<any> {
      const url = `${this.baseURL}addreply?parentId=${parentId}?postId=${postId}?userId=${userId}`;
      return this.httpClient.post<any>(url, null);
    }
}
