import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyPosts } from './models/my-posts';
import { LikeAction } from './models/post-like';
import { map } from 'rxjs/operators'; 


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private baseURL ="http://localhost:8081/api/post/";

  constructor(private httpClient : HttpClient) { }
  getPosts():
    Observable<MyPosts[]>{
      return this.httpClient.get<MyPosts[]>(this.baseURL + 'getallposts'); 

    }
    getPostById(postId: number): Observable<MyPosts> {
      return this.httpClient.get<MyPosts>(`${this.baseURL}getpost/${postId}`);
    }
   
    addPostAction(postId: number, userId: number, action: string): Observable<any> {
      const url = `${this.baseURL}${postId}/${userId}?action=${action}`;
      return this.httpClient.post(url, {}).pipe(
        map((response: any) => {
          if (action === LikeAction.dislike) {
            response.likes--;
          }
          return response;
        })
      );
    }

    filterPostsByTags(tags: string): Observable<MyPosts[]> {
      const url = `${this.baseURL}filterposts?tags=${tags}`;
      return this.httpClient.get<MyPosts[]>(url);
    } 
    
  filterByDatePost(datePost: string): Observable<any> {
    const url = `${this.baseURL}posts?date=${datePost}`;
    return this.httpClient.get<any>(url);
  }
  ReportPost(postId: number): Observable<any> {
    const url = `${this.baseURL}mark-reported?postId=${postId}`;
    return this.httpClient.post<any>(url, null);
  }
  
  UnReportPost(postId: number): Observable<any> {
    const url = `${this.baseURL}unmark-reported?postId=${postId}`;
    return this.httpClient.post<any>(url, null);
  }
  
    deletePost(postId:number):Observable<MyPosts>{
      return this.httpClient.delete<MyPosts>(`${this.baseURL}delete/${postId}`);
    }

    favoriteList(userId: number, postId: number): Observable<any> {
      return this.httpClient.post<any>(`${this.baseURL}add?userId=${userId}&postId=${postId}`, {});
    }
    unfavoritePost(userId: number, postId: number): Observable<any> {
      const url = `${this.baseURL}remove?userId=${userId}&postId=${postId}`;
      return this.httpClient.post<any>(url, {});
    }
    editPost(userId: number, postId: number, postData: FormData): Observable<any> {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
  
      return this.httpClient.post<any>(
        `${this.baseURL}addpost?userId=${userId}&postId=${postId}`,
        postData,
        { headers: headers }
      );
    }

    addPost(postData: FormData, userId:number): Observable<any> {
    
      
      return this.httpClient.post<any>(`${this.baseURL}addpost?userId=${userId}`, postData);
    }


  
    
  }

