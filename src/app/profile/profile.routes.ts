import { Route } from '@angular/router';

import { Page404Component } from 'app/authentication/page404/page404.component';
import { ProfileComponent } from 'app/profile/profile.component';


export const PROFILE_ROUTE: Route[] = [
  {
    path: 'profile',
    component: ProfileComponent,
  },

  { path: '**', component: Page404Component },
];