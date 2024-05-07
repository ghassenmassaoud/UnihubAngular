import { Page404Component } from '../authentication/page404/page404.component';
import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeworkComponent } from './homework/homework.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { TimetableComponent } from './timetable/timetable.component';
import { SettingsComponent } from './settings/settings.component';
import {  ListClassrromStudentComponent } from './list-classrrom-student/list-classrrom-student.component';
import { AboutClassroomStudentComponent } from './about-classroom-student/about-classroom-student.component';
//import { HomeworkComponent } from './homework/homework.component';
import { DemandeListeComponent } from './demande-liste/demande-liste.component';
import { AddDemandeComponent } from './add-demande/add-demande.component';
import { SeenDemandsComponent } from './seen-demands/seen-demands.component';
import { UnSeenDemandsComponent } from './un-seen-demands/un-seen-demands.component';
import { AddComplaintComponent } from './Complaints/add-complaint/add-complaint.component';
import { EditDemandComponent } from './edit-demand/edit-demand.component';

export const STUDENT_ROUTE: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path:'Listclassroom',
    component:ListClassrromStudentComponent,
  },

  {path:'aboutClassroomstudent/:classroomId',
  component:AboutClassroomStudentComponent,
  },
  {
    path: 'homework',
    component: HomeworkComponent,
  },
  // {
  //   path: 'EditDemand',
  //   component: EditDemandComponent,
  // },


  {
  path: 'SeenDemands',
  component: SeenDemandsComponent,
},
{
  path: 'Demands',
  component: DemandeListeComponent,
},
{
  path: 'Complaints',
  component: AddComplaintComponent,
},
{
  path: 'UnSeenDemands',
  component: UnSeenDemandsComponent,
},
  {
    path: 'AddDemand',
    component: AddDemandeComponent,
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
