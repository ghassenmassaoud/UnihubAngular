import { Route } from '@angular/router';

import { Page404Component } from 'app/authentication/page404/page404.component';
import { AboutComponent } from './about.component';

export const ABOUT_ROUTE: Route[] = [
  {
    path: 'about',
    component: AboutComponent,
  },

  { path: '**', component: Page404Component },
];
