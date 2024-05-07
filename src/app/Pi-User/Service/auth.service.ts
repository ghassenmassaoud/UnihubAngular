import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
//import { User } from '../models/user';
import { Role } from '@core/models/role';
import { jwtDecode } from "jwt-decode";
import { ResponseAuth } from '@core/models/ResponseAuth';
import { User } from '../Models/User';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
//   private currentUserSubject: BehaviorSubject<User>;
//   public currentUser: Observable<User>;



  constructor(private http: HttpClient) {
  }



  login(email: string, password: string) {

   return this.http.post<ResponseAuth>("http://localhost:8081/api/auth/login",{email:email,password:password})

  }
  Register(firstName:string,lastName:string, password: string,email: string) {

    return this.http.post("http://localhost:8081/api/auth/register/1",{firstName:firstName,lastName:lastName,password:password,email:email})

   }
  GetOneUser(){
    let access_token= localStorage.getItem('access_token');
    let decodedAccessToken = jwtDecode(access_token as any) as any;

    return this.http.get<User>("http://localhost:8081/api/user/getUser/"+decodedAccessToken.sub )
  }
  GetAllUser(){

    return this.http.get<User[]>("http://localhost:8081/api/user/all")
  }
  updateUser(user:User){

   return  this.http.put("http://localhost:8081/api/user/update/"+user.idUser,{
    firstName:user.firstName,email:user.email
   })
  }
  resetPassword(OldPassword:any,newPassword:any,confirmationPassword:any,id:any){
    console.log(OldPassword)
   return  this.http.post("http://localhost:8081/api/user/changePass/"+id,{
    oldPassword:OldPassword,newPassword:newPassword,confirmationPassword:confirmationPassword
   })
  }
  refreshToken(){
   let refreshToken= localStorage.getItem('refresh_token');
 return this.http.get("http://localhost:8081/api/auth/refresh-token",{headers: {Authorization: `Bearer ${refreshToken}`},})

  }
  error(message: string) {
    return throwError(message);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // this.currentUserSubject.next(this.currentUserValue);
    return of({ success: false });
  }
}
