import { Route } from '@angular/router';

import { Page404Component } from 'app/authentication/page404/page404.component';
import { LoginComponent } from './login.component';





export const LOGIN_ROUTE: Route[] = [
  {
    path: 'home',
    component: LoginComponent,
  },

  { path: '**', component: Page404Component },
];