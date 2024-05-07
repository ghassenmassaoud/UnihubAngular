import { Route } from '@angular/router';

import { Page404Component } from 'app/authentication/page404/page404.component';
import { HomeComponent } from './home.component';
import { ProfileComponent } from '../profile/profile.component';





export const HOME_ROUTE: Route[] = [
  // {
  //   path: "",
  //   redirectTo: "home",
  //   pathMatch: "full",
  // },
  {
    path: 'home',
    component: HomeComponent,
  },
  // {
  //   path: 'profile',
  //   component: ProfileComponent},

  { path: '**', component: Page404Component },
];