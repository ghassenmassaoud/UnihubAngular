import { Route } from '@angular/router';

import { Page404Component } from 'app/authentication/page404/page404.component';
import { BlogComponent } from './blog.component';


export const BLOG_ROUTE: Route[] = [
  {
    path: 'blog',
    component: BlogComponent,
  },

  { path: '**', component: Page404Component },
];
