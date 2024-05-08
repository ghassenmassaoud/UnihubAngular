import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { Profile } from 'app/models/profile';
import { ProfileService } from 'app/services/profile.service';
import { EventService } from 'app/services/event.service';
import { NgModule } from '@angular/core';
import { Event } from 'app/models/event';
import { ActivatedRoute, Router } from '@angular/router';
import { number } from 'echarts';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-myprofile',
  standalone: true,
  imports: [CommonModule,BreadcrumbComponent, MatProgressSpinnerModule],
  templateUrl: './myprofile.component.html',
  styleUrls: ['../../assets/css/menus.css','../../assets/css/animate.css',
  '../../assets/css/animate.css','../../assets/css/owl.carousel.css','../../assets/fonts/elegant-icon.css','../../assets/css/magnific-popup.css',
  '../../assets/css/animations.css','../../assets/css/style.css','../../assets/css/custom-spacing.css','../../assets/css/responsive.css'
]
})
export class MyprofileComponent implements OnInit {
  idUser!:number
  id!:number
  idClub!:number
  event!: Event
  events:Event[]=[];
  profile!: Profile;


  constructor(private Act : ActivatedRoute, private profileService:ProfileService, private eventService: EventService,private router: Router){}


  ngOnInit():void {
    this.loadJsFiles();
    this.idUser= this.Act.snapshot.params['idUser']
    this.idClub= this.Act.snapshot.params['idClub']
    this.id= this.Act.snapshot.params['id']

   console.log(this.idClub)

    this.profileService.getProfile(this.idUser, this.idClub).subscribe(
      data=>{ console.log(data)
        return this.profile=data}


    )



    this.profileService.geteventByClub(this.idClub).subscribe(
      data=>this.events=data
    )

      //const idutilisateur = 1;


      // this.profileService.addEventForClub(this.idClub, idutilisateur, this.event).subscribe(
      //   data => {
      //     console.log(data);
      //     this.router.navigate(['/blog-detail']);
      //   },
      //   error => {
      //     console.error(error);
      //     // Gérer l'erreur ici
      //   }
      // );
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

