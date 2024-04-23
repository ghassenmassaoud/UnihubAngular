import { Route } from '@angular/router';

import { Page404Component } from 'app/authentication/page404/page404.component';
import { CouresesRightSideBarComponent } from './coureses-right-side-bar.component';





export const COURESESRIGHTSIDE_ROUTE: Route[] = [
  {
    path: 'coureses-right-side',
    component: CouresesRightSideBarComponent,
  },

  { path: '**', component: Page404Component },
];