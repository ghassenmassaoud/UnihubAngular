import { Route } from '@angular/router';

import { Page404Component } from 'app/authentication/page404/page404.component';
import { EventSingleComponent } from './event-single.component';




export const EVENTSINGLE_ROUTE: Route[] = [
  {
    path: 'event-single',
    component: EventSingleComponent,
  },

  { path: '**', component: Page404Component },
];