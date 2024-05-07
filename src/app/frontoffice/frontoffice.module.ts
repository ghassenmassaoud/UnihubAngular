import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { PageLoaderComponent } from 'app/layout/page-loader/page-loader.component';
import { HeaderComponent } from 'app/header/header.component';
import { NavBarComponent } from 'app/Pi-User/nav-bar/nav-bar.component';



@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, RouterLink,RouterLinkActive,FrontofficeRoutingModule],
})
export class FrontofficeModule { }
