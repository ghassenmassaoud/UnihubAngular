import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { NavBarComponent } from 'app/Pi-User/nav-bar/nav-bar.component';
import { HeaderComponent } from 'app/header/header.component';
import { PageLoaderComponent } from 'app/layout/page-loader/page-loader.component';

@Component({
  selector: 'app-frontoffice',
  standalone: true,
  imports: [PageLoaderComponent,HeaderComponent,NavBarComponent,RouterModule, RouterLink,RouterLinkActive],
  templateUrl: './frontoffice.component.html',
  styleUrl: './frontoffice.component.scss'
})
export class FrontofficeComponent {

}
