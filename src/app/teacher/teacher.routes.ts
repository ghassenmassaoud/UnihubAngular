import { ExamScheduleComponent } from './exam-schedule/exam-schedule.component';
import { LecturesComponent } from './lectures/lectures.component';
import { Page404Component } from '../authentication/page404/page404.component';
import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { SettingsComponent } from './settings/settings.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { AboutClassroomComponent } from './about-classroom/about-classroom.component';
import { ListClassroomComponent } from './list-classroom/list-classroom.component';
import { ReplTaskTeacherComponent } from './repl-task-teacher/repl-task-teacher.component';

export const TEACHER_ROUTE: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'classroom',
    component: ClassroomComponent
  },
  {
    path: 'Listclassroom',
    component: ListClassroomComponent


  },
  {
    path: 'aboutClassroom/:classroomId',
    component: AboutClassroomComponent
  },
  { path: 'replyTask/:taskId',
   component: ReplTaskTeacherComponent },

  {
    path: 'lectures',
    component: LecturesComponent,
  },
  {
    path: 'leave-request',
    component: LeaveRequestComponent,
  },
  {
    path: 'exam-schedule',
    component: ExamScheduleComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  { path: '**', component: Page404Component },
];
