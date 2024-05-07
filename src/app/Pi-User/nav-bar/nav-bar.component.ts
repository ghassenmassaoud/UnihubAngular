import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['../../../assets/css/menus.css','../../../assets/css/animate.css','../../../assets/css/owl.carousel.css','../../../assets/fonts/elegant-icon.css','../../../assets/css/magnific-popup.css',
  '../../../assets/css/animations.css','../../../assets/css/style.css','../../../assets/css/custom-spacing.css','../../../assets/css/responsive.css'
]
})
export class NavBarComponent {
  constructor(private route: Router,private serv:AuthService){

  }
  logged:boolean = false
  ngOnInit(): void {
    let access_token= localStorage.getItem('access_token');
    if (access_token) {
      this.logged = true
    }




    this.loadJsFiles();
}
logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  this.route.navigate(['/main/home'])
  this.logged = false

}
loadJsFiles(): void {
  this.loadExternalScript(" ../../../assets/js/main.js");
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
