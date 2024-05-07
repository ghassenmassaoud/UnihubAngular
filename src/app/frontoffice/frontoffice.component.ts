import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { NavBarComponent } from 'app/Pi-User/nav-bar/nav-bar.component';
import { HeaderComponent } from 'app/header/header.component';
import { PageLoaderComponent } from 'app/layout/page-loader/page-loader.component';
import { filter, merge } from 'rxjs';



@Component({
  selector: 'app-frontoffice',
  standalone: true,
  imports: [PageLoaderComponent,HeaderComponent,NavBarComponent,RouterModule, RouterLink,RouterLinkActive],
  templateUrl: './frontoffice.component.html',
  styleUrl: './frontoffice.component.scss'
})
export class FrontofficeComponent {
  isQuestionsPage: boolean = true;

  constructor(private router: Router) {
    const pathsToCheck = ['/main/resources', '/quiz-chart','question-quiz','activities-back'];
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isQuestionsPage = pathsToCheck.some(path => event.url.includes(path));
      });
  }
}

// Add more paths as needed
// Check if the current URL contains any of the paths

