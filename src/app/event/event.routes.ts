import { Route } from '@angular/router';

import { Page404Component } from 'app/authentication/page404/page404.component';
import { EventComponent } from './event.component';


export const EVENT_ROUTE: Route[] = [
  {
    path: 'event',
    component: EventComponent,
  },

  { path: '**', component: Page404Component },
];