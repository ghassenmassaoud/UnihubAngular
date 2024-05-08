import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Club } from 'app/models/club';
import { Event } from 'app/models/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private apiUrl = 'http://localhost:8081/api/clubs/getClubs'; // Remplacez l'URL par votre point de terminaison API

  private getClubByIdURL = 'http://localhost:8081/api/clubs/getClub'

  private getEventByClubIdURL = 'http://localhost:8081/api/events/getEventByClubId'

  private getClubsForMemberURL = 'http://localhost:8081/api/clubs/getClubsForMember'

  private profileUrl = 'http://localhost:8081/api/clubs/assignUserToClub'

  //private affectEventToUserURL='http://localhost:8086/api/events/addStudentToEvent/{{eventId}}/{{studentId}}'

  private affectEventToUserURL='http://localhost:8081/api/events/addStudentToEvent'



  constructor(private httpClient: HttpClient, private router: Router) { }

  getClubList(): Observable<Club[]> {
    return this.httpClient.get<Club[]>(`${this.apiUrl}`);
  }

  getClub(id:number){
    return this.httpClient.get<Club>(`${this.getClubByIdURL}/${id}`);
  }

  getEventListByClubId(id:number): Observable<Event[]> {
    return this.httpClient.get<Event[]>(`${this.getEventByClubIdURL}/${id}`);
  }

  getClubsForMember(id:number): Observable<Club[]> {
    return this.httpClient.get<Club[]>(`${this.getClubsForMemberURL}/${id}`);

  }

  //

  assignUserToClub(clubId: number, userId: number): Observable<any> {
    return this.httpClient.post(`${this.profileUrl}/${clubId}/${userId}`, {});
}

redirectToProfile(userId: number, clubId: number): void {
  this.router.navigate(['/profile', userId, clubId]);
}

assignUserToEvent(idEvent: number, idutilisateur: number): Observable<any> {
  const url = `${this.affectEventToUserURL}/${idEvent}/${idutilisateur}`;
  return this.httpClient.post(url, {});
}

redirectTojoinedEvent(idutilisateur:number): void {
  this.router.navigate(['/home', idutilisateur]);
}


  }



