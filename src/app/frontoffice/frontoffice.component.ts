import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { NavBarComponent } from 'app/Pi-User/nav-bar/nav-bar.component';
import { HeaderComponent } from 'app/header/header.component';
import { PageLoaderComponent } from 'app/layout/page-loader/page-loader.component';
import { filter, merge } from 'rxjs';



@Component({
  selector: 'app-frontoffice',
  standalone: true,
  imports: [PageLoaderComponent,HeaderComponent,NavBarComponent,RouterModule, RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './frontoffice.component.html',
  styleUrl: './frontoffice.component.scss'
})
export class FrontofficeComponent {
  isQuestionsPage: boolean = true;

  constructor(private router: Router) {
    const pathsToCheck = ['/main/resources', '/main/Listclassroom','/main/aboutClassroom/:classroomId','/main/AddDemand','/main/SeenDemands','/main/UnSeenDemands'
      ,'/main/AddComplaint','/main/posts','/main/post/:postId','/main/share','/main/spaces','/main/EventJoined/:idUtilisateur','/main/profileClub/:idUser/:idClub','/main/eventList',
      '/main/ClubJoined/:id','/main/ClubDetail/:id'
    ];
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isQuestionsPage = pathsToCheck.some(path => event.url.includes(path));
      });
  }
}

// Add more paths as needed
// Check if the current URL contains any of the paths

