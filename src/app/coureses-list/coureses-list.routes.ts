import { Route } from '@angular/router';

import { Page404Component } from 'app/authentication/page404/page404.component';
import { CouresesListComponent } from './coureses-list.component';





export const COURESESLIST_ROUTE: Route[] = [
  {
    path: 'coureses-list',
    component: CouresesListComponent,
  },

  { path: '**', component: Page404Component },
];