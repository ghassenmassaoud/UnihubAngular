import { Page404Component } from '../authentication/page404/page404.component';
import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { HomeworkComponent } from './homework/homework.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { TimetableComponent } from './timetable/timetable.component';
import { SettingsComponent } from './settings/settings.component';
import { DemandeListeComponent } from './demande-liste/demande-liste.component';

export const STUDENT_ROUTE: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'Demand',
    component: DemandeListeComponent,
  },
  {
    path: 'leave-request',
    component: LeaveRequestComponent,
  },
  {
    path: 'timetable',
    component: TimetableComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  { path: '**', component: Page404Component },
];
