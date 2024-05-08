import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Club } from 'app/models/club';
import { ClubService } from 'app/services/club.service';
import { ProfileService } from 'app/services/profile.service';
@Component({
  selector: 'app-club-joined',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './club-joined.component.html',
  styleUrls: ['../../assets/css/menus.css','../../assets/css/animate.css',
  '../../assets/css/animate.css','../../assets/css/owl.carousel.css','../../assets/fonts/elegant-icon.css','../../assets/css/magnific-popup.css',
  '../../assets/css/animations.css','../../assets/css/style.css','../../assets/css/custom-spacing.css','../../assets/css/responsive.css'
]
})
export class ClubJoinedComponent {
  id!:number
  clubs:Club[]=[];
  
  
  constructor(private Act : ActivatedRoute, private clubService:ClubService,private profileService:ProfileService, private router:Router){}
  ngOnInit(): void {
    this.loadJsFiles();
    this.id= this.Act.snapshot.params['id']

    this.clubService.getClubsForMember(this.id).subscribe(data =>{
      console.log(data)
      this.clubs = data;
    }
    )


    
}


idUser = 3; // ID de l'utilisateur (à remplacer par votre propre logique pour obtenir l'ID de l'utilisateur)

redirectToProfile(idClub: number): void {
  //const idUser = 2;
  this.profileService.getProfile(this.idUser, idClub).subscribe(() => {
  this.router.navigate(['/profile', this.idUser, idClub]);
});
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
