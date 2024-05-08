import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Club } from 'app/models/club';
import { ClubService } from 'app/services/club.service';
import { Router } from '@angular/router';
import { User } from 'app/Pi-User/Models/User';
import { AuthService } from 'app/Pi-User/Service/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-myclub',
  standalone: true,
  imports: [CommonModule, MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,],
  templateUrl: './myclub.component.html',
  styleUrls:  ['../../assets/css/menus.css','../../assets/css/animate.css',
  '../../assets/css/animate.css','../../assets/css/owl.carousel.css','../../assets/fonts/elegant-icon.css','../../assets/css/magnific-popup.css',
  '../../assets/css/animations.css','../../assets/css/style.css','../../assets/css/custom-spacing.css','../../assets/css/responsive.css'
]
})
export class MyclubComponent {
  clubId!:number
  clubs: Club[]=[];
  listUsers:User[]=[]
  constructor(private myclubService: ClubService,private router: Router,private serv:AuthService ){}


  ngOnInit(): void {
   // this.loadJsFiles();
    //hne bch nabda nekhdem nzid l partie tei ena
   this.getClubs();
   let access_token= localStorage.getItem('access_token');
   if (access_token) {

    this.serv.GetOneUser().subscribe(res=> {
      console.log(res)
      localStorage.setItem('IdUser', (res as any).idUser);
      })
      // this.loadJsFiles();
  }}

  private getClubs(){
    this.myclubService.getClubList().subscribe(data => {
      console.log(data)
    this.clubs = data;

    });



}



redirectToCourse(clubId: number) {
  this.router.navigate(['/coureses-single', clubId]);
}
// loadJsFiles(): void {
//   this.loadExternalScript(" ../../../assets/js/main.js");
//   //  this.loadExternalScript(" ../../assets/js/menus.js");
//   //  this.loadExternalScript(" ../../assets/js/jquery.min.js");
//   // this.loadExternalScript(" ../../assets/js/modernizr-2.8.3.min.js");
//   // this.loadExternalScript(" ../../assets/js/bootstrap.min.js");
//   // this.loadExternalScript(" ../../assets/js/owl.carousel.min.js");
//   // this.loadExternalScript(" ../../assets/js/jquery.magnific-popup.min.js");
//   // this.loadExternalScript(" ../../assets/js/jquery.counterup.min.js");
//   // this.loadExternalScript(" ../../assets/js/waypoints.min.js");
//   // this.loadExternalScript(" ../../assets/js/wow.min.js");
//   // this.loadExternalScript(" ../../assets/js/isotope.pkgd.min.js");
//   // this.loadExternalScript(" ../../assets/js/imagesloaded.pkgd.min.js");
//   // this.loadExternalScript(" ../../assets/js/plugins.js");



// }
// loadExternalScript(url: string): void {
//   this.loadScript(url)
//     .then(() => {
//       console.log('Script loaded successfully');
//     })
//     .catch((error) => {
//       console.error('Script loading failed:', error);
//     });
// }
// loadScript(url: string): Promise<void> {
//   return new Promise<void>((resolve, reject) => {
//     const scriptElement = document.createElement('script');
//     scriptElement.src = url;

//     scriptElement.onload = () => {
//       resolve();
//     };

//     scriptElement.onerror = (error) => {
//       reject(error);
//     };

//     document.body.appendChild(scriptElement);
//   });
// }
}



