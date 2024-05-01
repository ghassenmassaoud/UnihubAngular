import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyPosts } from './models/my-posts';

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
      return this.httpClient.post(url, {});
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

    editPost(userId: number, postId: number, postData: FormData): Observable<any> {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
  
      return this.httpClient.post<any>(
        `${this.baseURL}addpost?userId=${userId}&postId=${postId}`,
        postData,
        { headers: headers }
      );
    }
 
    // addPost(postData: FormData): Observable<any> {
    //   const headers = new HttpHeaders();
    //   headers.append('Content-Type', 'multipart/form-data');
      
    //   return this.httpClient.post<any>(this.baseURL, postData, { headers: headers });
    // }
    addPost(postData: FormData, userId:number): Observable<any> {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      
      return this.httpClient.post<any>(`${this.baseURL}addpost?userId=${userId}`, postData, { headers: headers });
    }
    
    // addPost(newPost: MyPosts): Observable<MyPosts> {
    //   return this.httpClient.post<MyPosts>(this.baseURL + 'addpost', newPost);
    // }
    
    // addPost(newPost: MyPosts): Observable<MyPosts> {
    //   return this.httpClient.post<MyPosts>(this.baseURL + 'addpost/'+ idUsers ,newPost);
    // }
    // *********correct
    // addPost(, userId: number): Observable<any> {
    //   // const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    //   return this.httpClient.post<any>(`${this.baseURL}addpost?userId=${userId}`, post);
    // }
    // addPost(post: FormData): Observable<any> {
    //   const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    //   return this.httpClient.post<any>(`${this.baseURL}addpost`, post, { headers });
    // }

    // addPost(post: MyPosts, studentId?: number, file?: FileList): Observable<any> {
    //   const formData = new FormData();
    //   formData.append('post', JSON.stringify(post)); // Ajoutez la partie 'post' avec les données JSON de l'objet MyPosts
    
    //   // Ajouter d'autres données au formulaire FormData si nécessaire
    //   if (studentId) {
    //     formData.append('studentId', studentId.toString());
    //   }
    //   if (file) {
    //     formData.append('file', file[0]);
    //   }
    
    //   return this.httpClient.post<any>(this.baseURL + 'addpost', formData);
    // }
    
  }

