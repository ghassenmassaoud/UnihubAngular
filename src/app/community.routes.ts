import { Route } from '@angular/router';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { AuthGuard } from '@core/guard/auth.guard';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { Page404Component } from './authentication/page404/page404.component';
import { Role } from '@core';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { ProfileComponent } from './profile/profile.component';
import { EventComponent } from './event/event.component';
import { EventSideBarComponent } from './event-side-bar/event-side-bar.component';
import { EventSingleComponent } from './event-single/event-single.component';
import { ContactComponent } from './contact/contact.component';
import { CouresesComponent } from './coureses/coureses.component';
import { CouresesListComponent } from './coureses-list/coureses-list.component';
import { CouresesRightSideBarComponent } from './coureses-right-side-bar/coureses-right-side-bar.component';
import { CouresesSingleComponent } from './coureses-single/coureses-single.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { InsructorsComponent } from './insructors/insructors.component';
import { HomeSecondeComponent } from './home-seconde/home-seconde.component';
import { PostsComponent } from './posts/all-posts/posts.component';
import { AboutPostsComponent } from './posts/about-posts/about-posts.component';

export const APP_ROUTE: Route[] = [
//   {
//     path: 'all-posts',
//     component: PostsComponent,
//     loadChildren: () =>
//       import('./posts/posts.routes'),
//   },
//   {
//     path: 'about-posts',
//     component: AboutPostsComponent,
//     loadChildren: () =>
//       import('./posts/about-posts.routes').then((m) => m.ABOUT_ROUTE),
//   },
  
//   { path: '**', component: Page404Component },
];
