import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { PageLoaderComponent } from './layout/page-loader/page-loader.component';
import { HeaderComponent } from './header/header.component';
import { filter } from 'rxjs/operators';
import { merge } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { NavBarComponent } from './Pi-User/nav-bar/nav-bar.component';
import { FrontofficeModule } from './frontoffice/frontoffice.module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, PageLoaderComponent,HeaderComponent,NavBarComponent, RouterLink,RouterLinkActive],
  providers: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {
  currentUrl!: string;
  constructor(public router: Router) {


    merge(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ),
      this.router.events
    ).subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.currentUrl = routerEvent.url.substring(
          routerEvent.url.lastIndexOf('/') + 1
        );
      }
      // if (routerEvent instanceof NavigationEnd) {
      //   this.isQuestionsPage = routerEvent.url.includes('/home');
      // }
      window.scrollTo(0, 0);
    });

  }

  ngOnInit() {
    let access_token= localStorage.getItem('access_token');

  // if(access_token){

  //   let decodedAccessToken = jwtDecode(access_token);
  //   const role = (decodedAccessToken as any).role[0].authority;

  //   if ( role === "ROLE_ADMIN") {
  //     this.router.navigate(['/admin/dashboard/main']);

  //   } else if (role === "ROLE_TEACHER") {
  //     this.router.navigate(['/teacher/dashboard']);

  //   } else if (role === "ROLE_STUDENT") {
  //     this.router.navigate(['/student/dashboard']);

  //   }
  // }else{
  // console.log("heloo")
  // this.router.navigate(['/authentication/signin']);
  // }}
}

}
