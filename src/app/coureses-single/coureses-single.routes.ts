import { Route } from '@angular/router';

import { Page404Component } from 'app/authentication/page404/page404.component';
import { CouresesSingleComponent } from './coureses-single.component';





export const COURESESSINGLE_ROUTE: Route[] = [
  {
    path: 'coureses-single',
    component: CouresesSingleComponent,
  },

  { path: '**', component: Page404Component },
];