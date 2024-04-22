import { Route } from '@angular/router';

import { Page404Component } from 'app/authentication/page404/page404.component';
import { HomeComponent } from './home.component';





export const HOME_ROUTE: Route[] = [
  {
    path: 'home',
    component: HomeComponent,
  },

  { path: '**', component: Page404Component },
];