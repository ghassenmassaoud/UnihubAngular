import { Route } from '@angular/router';

import { Page404Component } from 'app/authentication/page404/page404.component';
import { ContactComponent } from './contact.component';




export const CONTACT_ROUTE: Route[] = [
  {
    path: 'contact',
    component: ContactComponent,
  },

  { path: '**', component: Page404Component },
];