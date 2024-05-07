import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ressource } from '@core/models/ressource';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { path } from 'd3';

@Injectable({
  providedIn: 'root'
})
export class RessourceServiceService {
 

  constructor(private http:HttpClient,private cookieService: CookieService) { }
  url:string = 'http://localhost:8081/api/ressource/';
  urlbeha:string = 'http://localhost:8081/api/user-interactions/'
  spaceUrl:string = 'http://localhost:8081/api/Space/';

getspaces() : Observable<any>{
    return this.http.get(`${this.spaceUrl}showAll`);
  }
 
  getRessourcesBySpaceId(spaceId:number): Observable<any> {
    return this.http.get<any>(`${this.url}showBySpace/${spaceId}`);
  }
  getAllRessource(): Observable<any> {
    return this.http.get<any>(`${this.url}All`);
  }
  getPrp() : Observable<any>{
    return this.http.get<any>(`${this.urlbeha}populaire`);
  }
  addNewRessource(rName:string,rType:string,spaceId:number,file:File,description:string,user:number):Observable<any>{
      const data = new FormData();
      data.append('file', file);
      data.append('name', rName);
      data.append('type', rType);
      data.append('spaceId', spaceId.toString());
      data.append('description',description);
      data.append('user',user.toString());
    return this.http.post(`${this.url}upload`,data)
  }
  deleteResource(resId:number): Observable<any>{
    return this.http.delete(`${this.url}Delete/${resId}`,{responseType:'text'});
  }

  updateRessource(resId:number,res:ressource):Observable<any>{
    return this.http.put<ressource>(`${this.url}update/${resId}`,res);
  }

  download(arg0: any) {
    return this.http.get(`${this.url}download/${arg0}`, {
      responseType: 'blob' 
    }).subscribe((response: Blob) => {
      
      const blobURL = window.URL.createObjectURL(response);
      
      const parts: string[] = arg0.split("_");
      const originalFileName: string = parts.slice(1).join("_");
      const link = document.createElement('a');
      link.href = blobURL;
      link.download = originalFileName;
      
     
      link.click();
      
     
      window.URL.revokeObjectURL(blobURL);
    });
  }
  behaviour(_t52: ressource) : Observable<any>{
    return this.http.post(`${this.urlbeha}setCoockie`,_t52.ressourceId,{
      observe: 'response',
      withCredentials: true
    })
  }

  sendCookies() {
    
    return this.http.get(`${this.urlbeha}cookie`,{
      observe: 'response',
      withCredentials: true
      
    }),this.cookieService.deleteAll('/','localhost');
    
  }
}
