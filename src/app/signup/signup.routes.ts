import { Route } from '@angular/router';

import { Page404Component } from 'app/authentication/page404/page404.component';
import { SignupComponent } from './signup.component';





export const SIGNUP_ROUTE: Route[] = [
  {
    path: 'signup',
    component: SignupComponent,
  },

  { path: '**', component: Page404Component },
];