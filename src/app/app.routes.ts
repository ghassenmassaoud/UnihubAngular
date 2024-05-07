import { Route } from '@angular/router';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { AuthGuard } from '@core/guard/auth.guard';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { Page404Component } from './authentication/page404/page404.component';
import { Role } from '@core';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { ProfileComponent } from './Pi-User/profile/profile.component';
import { EventComponent } from './event/event.component';
import { EventSideBarComponent } from './event-side-bar/event-side-bar.component';
import { EventSingleComponent } from './event-single/event-single.component';
import { ContactComponent } from './contact/contact.component';
import { CouresesComponent } from './coureses/coureses.component';
import { CouresesListComponent } from './coureses-list/coureses-list.component';
import { CouresesRightSideBarComponent } from './coureses-right-side-bar/coureses-right-side-bar.component';
import { CouresesSingleComponent } from './coureses-single/coureses-single.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { InsructorsComponent } from './insructors/insructors.component';
import { HomeSecondeComponent } from './home-seconde/home-seconde.component';
import { HomeComponent } from './Pi-User/home/home.component';
import { FrontofficeComponent } from './frontoffice/frontoffice.component';

export const APP_ROUTE: Route[] = [
  {path:'main', component:FrontofficeComponent , loadChildren: ()=> import('./frontoffice/frontoffice.module').then(m=>m.FrontofficeModule)},
  // {
  //   path: 'home',
  //    component: HomeComponent,
  //   // canActivate: [AuthGuard],

  //   loadChildren: () =>
  //     import('./Pi-User/home/home.routes').then((m) => m.HOME_ROUTE),
  // },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () =>
      import('./login/login.routes').then((m) => m.LOGIN_ROUTE),
  },
  {
    path: 'signup',
    component: SignupComponent,
    loadChildren: () =>
      import('./signup/signup.routes').then((m) => m.SIGNUP_ROUTE),
  },
  {
    path: 'instructors',
    component: InsructorsComponent,
    loadChildren: () =>
      import('./insructors/instuctor.routes').then((m) => m.INSTRUCTORS_ROUTE),
  },
  {
    path: 'home-seconde',
    component: HomeSecondeComponent,
    loadChildren: () =>
      import('./home-seconde/HomeSeconde.routes').then((m) => m.HOMESECONDE_ROUTE),
  },
  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  //   loadChildren: () =>
  //     import('./Pi-User/profile/profile.routes').then((m) => m.PROFILE_ROUTE),
  // },
  {
    path: 'event',
    component: EventComponent,
    loadChildren: () =>
      import('./event/event.routes').then((m) => m.EVENT_ROUTE),
  },
  {
    path: 'event-side-bar',
    component: EventSideBarComponent,
    loadChildren: () =>
      import('./event-side-bar/event-side-bar.routes').then((m) => m.EVENTSIDEBAR_ROUTE),
  },
  {
    path: 'event-single',
    component: EventSingleComponent,
    loadChildren: () =>
      import('./event-single/event-single.routes').then((m) => m.EVENTSINGLE_ROUTE),
  },
  {
    path: 'blog',
    component: BlogComponent,
    loadChildren: () =>
      import('./blog/blog.routes').then((m) => m.BLOG_ROUTE),
  },
  {
    path: 'blog-details',
    component: BlogDetailsComponent,
    loadChildren: () =>
      import('./blog-details/blog-deatils.routes').then((m) => m. BLOGDETAILS_ROUTE),
  },
  {
    path: 'about',
    component: AboutComponent,
    loadChildren: () =>
      import('./about/about.routes').then((m) => m.ABOUT_ROUTE),
  },
  {
    path: 'coureses',
    component: CouresesComponent,
    loadChildren: () =>
      import('./coureses/coureses.routes').then((m) => m.COURESES_ROUTE),
  },
  {
    path: 'coureses-list',
    component: CouresesListComponent,
    loadChildren: () =>
      import('./coureses-list/coureses-list.routes').then((m) => m.COURESESLIST_ROUTE),
  },
  {
    path: 'coureses-right-side',
    component: CouresesRightSideBarComponent,
    loadChildren: () =>
      import('./coureses-right-side-bar/coureses-right-side-bar.routes').then((m) => m.COURESESRIGHTSIDE_ROUTE),
  },
  {
    path: 'coureses-single',
    component: CouresesSingleComponent,
    loadChildren: () =>
      import('./coureses-single/coureses-single.routes').then((m) => m.COURESESSINGLE_ROUTE),
  },
  {
    path: 'contact',
    component: ContactComponent,
    loadChildren: () =>
      import('./contact/contact.routes').then((m) => m.CONTACT_ROUTE),
  },
  {
    path: '',
    component: MainLayoutComponent,
     canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/main/home', pathMatch: 'full' },

      {
        path: 'admin',
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
          import('./admin/admin.routes').then((m) => m.ADMIN_ROUTE),
      },
      {
        path: 'teacher',
        canActivate: [AuthGuard],
        data: {
          role: Role.Teacher,
        },
        loadChildren: () =>
          import('./teacher/teacher.routes').then((m) => m.TEACHER_ROUTE),
      },
      {
        path: 'student',
        canActivate: [AuthGuard],
        data: {
          role: Role.Student,
        },
        loadChildren: () =>
          import('./student/student.routes').then((m) => m.STUDENT_ROUTE),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('./calendar/calendar.routes').then((m) => m.CALENDAR_ROUTE),
      },
      {
        path: 'task',
        loadChildren: () =>
          import('./task/task.routes').then((m) => m.TASK_ROUTE),
      },
      {
        path: 'contacts',
        loadChildren: () =>
          import('./contacts/contacts.routes').then((m) => m.CONTACT_ROUTE),
      },
      {
        path: 'email',
        loadChildren: () =>
          import('./email/email.routes').then((m) => m.EMAIL_ROUTE),
      },
      {
        path: 'apps',
        loadChildren: () =>
          import('./apps/apps.routes').then((m) => m.APPS_ROUTE),
      },
      {
        path: 'widget',
        loadChildren: () =>
          import('./widget/widget.routes').then((m) => m.WIDGET_ROUTE),
      },
      {
        path: 'ui',
        loadChildren: () => import('./ui/ui.routes').then((m) => m.UI_ROUTE),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./forms/forms.routes').then((m) => m.FORMS_ROUTE),
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./tables/tables.routes').then((m) => m.TEBLES_ROUTE),
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./charts/charts.routes').then((m) => m.CHART_ROUTE),
      },
      {
        path: 'timeline',
        loadChildren: () =>
          import('./timeline/timeline.routes').then((m) => m.TIMELINE_ROUTE),
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./icons/icons.routes').then((m) => m.ICONS_ROUTE),
      },
      {
        path: 'extra-pages',
        loadChildren: () =>
          import('./extra-pages/extra-pages.routes').then(
            (m) => m.EXTRA_PAGES_ROUTE
          ),
      },
      {
        path: 'maps',
        loadChildren: () =>
          import('./maps/maps.routes').then((m) => m.MAPS_ROUTE),
      },
      {
        path: 'multilevel',
        loadChildren: () =>
          import('./multilevel/multilevel.routes').then(
            (m) => m.MULTILEVEL_ROUTE
          ),
      },
    ],
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./Pi-User/authentication/auth.routes').then((m) => m.AUTH_ROUTE),
  },
  { path: '**', component: Page404Component },
];
