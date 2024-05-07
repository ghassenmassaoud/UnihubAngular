import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Event } from 'app/models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient, private router: Router) { }
  //private eventByClubUrl = 'http://localhost:8086/api/clubs/getClubs'; // Remplacez l'URL par votre point de terminaison API

  private affectEventToUserURL='http://localhost:8086/api/events/addStudentToEvent'

  private ListEventByUserIdURL='http://localhost:8086/api/events/eventsByStudent'

  private RecommandedEventForUserURL='http://localhost:8086/api/recommendation/users/events/recommended'

  private ListeAllEventURL ='http://localhost:8086/api/events/getEvents'

  private RechercheEventURL ='http://localhost:8086/api/events/recommend'



  getEventListByUserId(iduser:number): Observable<Event[]> {
    return this.httpClient.get<Event[]>(`${this.ListEventByUserIdURL}/${iduser}`);
  }

  RecommandedEventForUser(iduser:number): Observable<Event[]> {
    return this.httpClient.get<Event[]>(`${this.RecommandedEventForUserURL}/${iduser}`);
  }

  ListeAllEvent(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(`${this.ListeAllEventURL}`);
  }

  RechercheEvent(iduser:number,keyword:String): Observable<Event[]> {
    return this.httpClient.get<Event[]>(`${this.RechercheEventURL}/${iduser}/${keyword}`);
  }

//   assignUserToEvent(idEvent: number, idutilisateur: number): Observable<any> {
//     return this.httpClient.post(`${this.affectEventToUserURL}/${idEvent}/${idutilisateur}`, {});
// }

// redirectToProfile(idutilisateur: number, clubId: number): void {
//   this.router.navigate(['/profile', idutilisateur, clubId]);
// }

assignUserToEvent(idEvent: number, idutilisateur: number): Observable<any> {
  const url = `${this.affectEventToUserURL}/${idEvent}/${idutilisateur}`;
  return this.httpClient.post(url, {});
}



  
}
