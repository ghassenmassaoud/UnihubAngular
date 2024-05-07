// profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from 'app/models/profile';
import { Event } from 'app/models/event';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8086/api/clubs/getProfileById'; // Remplacez l'URL par votre point de terminaison API

  private eventByClubUrl = 'http://localhost:8086/api/events/getEventByClubId';
  
  private addEventForClubURL = 'http://localhost:8086/api/events/create'

  constructor(private httpClient: HttpClient) { }

  getProfile(idUser:number, idClub:number): Observable<Profile> {
    return this.httpClient.get<Profile>(`${this.apiUrl}/${idUser}/${idClub}`);
  }

  geteventByClub(id:number): Observable<Event[]> {
    return this.httpClient.get<Event[]>(`${this.eventByClubUrl}/${id}`);

  }

  addEventForClub(idClub:number, idUser:number,event:Event):Observable<Event>{
    return this.httpClient.post<Event>(`${this.addEventForClubURL}/${idClub}/${idUser}`,event);
  }


 


  
}
