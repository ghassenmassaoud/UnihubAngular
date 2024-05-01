import { Route } from '@angular/router';

import { Page404Component } from 'app/authentication/page404/page404.component';
import { EventSideBarComponent } from './event-side-bar.component';



export const EVENTSIDEBAR_ROUTE: Route[] = [
  {
    path: 'event-side-bar',
    component: EventSideBarComponent,
  },

  { path: '**', component: Page404Component },
];