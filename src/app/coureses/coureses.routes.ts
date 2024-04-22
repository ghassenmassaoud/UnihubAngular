import { Route } from '@angular/router';

import { Page404Component } from 'app/authentication/page404/page404.component';
import { CouresesComponent } from './coureses.component';





export const COURESES_ROUTE: Route[] = [
  {
    path: 'coureses',
    component: CouresesComponent,
  },

  { path: '**', component: Page404Component },
];