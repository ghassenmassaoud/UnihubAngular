import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Club } from 'app/models/club';
import { ClubService } from 'app/services/club.service';
import { EventService } from 'app/services/event.service';
import { Event } from 'app/models/event';

@Component({
  selector: 'app-club-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './club-detail.component.html',
  styleUrls:['../../assets/css/menus.css','../../assets/css/animate.css',
  '../../assets/css/animate.css','../../assets/css/owl.carousel.css','../../assets/fonts/elegant-icon.css','../../assets/css/magnific-popup.css',
  '../../assets/css/animations.css','../../assets/css/style.css','../../assets/css/custom-spacing.css','../../assets/css/responsive.css'
]
})
export class ClubDetailComponent {
  id!:number
  club!:Club
  clubId!:number
  events:Event[]=[];


  constructor(private Act : ActivatedRoute, private clubService:ClubService, private eventService:EventService, private router: Router){}


  ngOnInit(){
    this.loadJsFiles();
    this.id= this.Act.snapshot.params['id']
    this.clubId = this.Act.snapshot.params['clubId'];


    this.clubService.getClub(this.id).subscribe(
      data=>this.club=data

    )

    this.clubService.getEventListByClubId(this.id).subscribe(data =>{
      console.log(data)
      this.events = data;
    }
    )




  }


  joinClub(clubId: number): void {
    const userId =localStorage.getItem('IdUser');/// Remplacez 1 par l'ID de l'utilisateur (vous pouvez le récupérer depuis votre service d'authentification ou d'une autre manière)

    this.clubService.assignUserToClub(clubId, userId as any).subscribe(() => {
      // Redirection vers la page /coureses-single/clubId
      this.router.navigate(['/main/ClubJoined', userId]);
    });
  }


  //'/profile', this.idUser, idClub]

  // joinEvent(idEvent: number): void {
  //   const idutilisateur = 1; // Remplacez 1 par l'ID de l'utilisateur (vous pouvez le récupérer depuis votre service d'authentification ou d'une autre manière)

  //   this.eventService.assignUserToEvent(idEvent, idutilisateur).subscribe(data => {
  //     console.log(data)
  //   this.router.navigate(['/profile', idutilisateur, this.clubId])
  //   });
  // }

  joinEvent(idEvent: number): void {
    const idutilisateur = localStorage.getItem('IdUser'); // Remplacez 1 par l'ID de l'utilisateur (vous pouvez le récupérer depuis votre service d'authentification ou d'une autre manière)

    this.clubService.assignUserToEvent(idEvent, idutilisateur as any).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/main/EventJoined', idutilisateur]);
      },
      error => {
        console.error(error);
        // Gérer l'erreur ici
      }
    );
  }


loadJsFiles(): void {
  this.loadExternalScript(" ../../assets/js/main.js");
  //  this.loadExternalScript(" ../../assets/js/menus.js");
  //  this.loadExternalScript(" ../../assets/js/jquery.min.js");
  // this.loadExternalScript(" ../../assets/js/modernizr-2.8.3.min.js");
  // this.loadExternalScript(" ../../assets/js/bootstrap.min.js");
  // this.loadExternalScript(" ../../assets/js/owl.carousel.min.js");
  // this.loadExternalScript(" ../../assets/js/jquery.magnific-popup.min.js");
  // this.loadExternalScript(" ../../assets/js/jquery.counterup.min.js");
  // this.loadExternalScript(" ../../assets/js/waypoints.min.js");
  // this.loadExternalScript(" ../../assets/js/wow.min.js");
  // this.loadExternalScript(" ../../assets/js/isotope.pkgd.min.js");
  // this.loadExternalScript(" ../../assets/js/imagesloaded.pkgd.min.js");
  // this.loadExternalScript(" ../../assets/js/plugins.js");

}
loadExternalScript(url: string): void {
  this.loadScript(url)
    .then(() => {
      console.log('Script loaded successfully');
    })
    .catch((error) => {
      console.error('Script loading failed:', error);
    });
}
loadScript(url: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const scriptElement = document.createElement('script');
    scriptElement.src = url;

    scriptElement.onload = () => {
      resolve();
    };

    scriptElement.onerror = (error) => {
      reject(error);
    };

    document.body.appendChild(scriptElement);
  });
}

}
