import { Route } from '@angular/router';

import { Page404Component } from 'app/authentication/page404/page404.component';
import { BlogDetailsComponent } from './blog-details.component';


export const BLOGDETAILS_ROUTE: Route[] = [
  {
    path: 'blog-details',
    component: BlogDetailsComponent,
  },

  { path: '**', component: Page404Component },
];