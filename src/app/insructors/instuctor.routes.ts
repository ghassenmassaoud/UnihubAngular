import { Route } from '@angular/router';

import { Page404Component } from 'app/authentication/page404/page404.component';
import { InsructorsComponent } from './insructors.component';





export const INSTRUCTORS_ROUTE: Route[] = [
  {
    path: 'instructor',
    component: InsructorsComponent,
  },

  { path: '**', component: Page404Component },
];