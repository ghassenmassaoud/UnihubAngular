import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'app/Pi-User/home/home.component';
import { ProfileComponent } from 'app/Pi-User/profile/profile.component';
import { AddComplaintComponent } from 'app/student/Complaints/add-complaint/add-complaint.component';
import { AboutClassroomStudentComponent } from 'app/student/about-classroom-student/about-classroom-student.component';
import { AddDemandeComponent } from 'app/student/add-demande/add-demande.component';
import { ListClassrromStudentComponent } from 'app/student/list-classrrom-student/list-classrrom-student.component';
import { SeenDemandsComponent } from 'app/student/seen-demands/seen-demands.component';
import { UnSeenDemandsComponent } from 'app/student/un-seen-demands/un-seen-demands.component';
const routes: Routes = [

    {path:'home',component:HomeComponent},

    {
        path: 'profile',
        component: ProfileComponent,
        loadChildren: () =>
          import('../Pi-User/profile/profile.routes').then((m) => m.PROFILE_ROUTE),
      },
      {
        path: 'Listclassroom',
        component: ListClassrromStudentComponent,
        loadChildren: () =>
          import('../student/student.routes').then((m) => m.STUDENT_ROUTE),
      },
      {
        path: 'aboutClassroom/:classroomId',
        component: AboutClassroomStudentComponent,
         loadChildren: () =>
           import('../student/student.routes').then((m) => m.STUDENT_ROUTE),
      },
      {
        path: 'AddDemand',
        component: AddDemandeComponent,
         loadChildren: () =>
           import('../student/student.routes').then((m) => m.STUDENT_ROUTE),
      },
      {
        path: 'SeenDemands',
        component: SeenDemandsComponent,
         loadChildren: () =>
           import('../student/student.routes').then((m) => m.STUDENT_ROUTE),
      },
      {
        path: 'UnSeenDemands',
        component: UnSeenDemandsComponent,
         loadChildren: () =>
           import('../student/student.routes').then((m) => m.STUDENT_ROUTE),
      },
      {
        path: 'AddComplaint',
        component: AddComplaintComponent,
         loadChildren: () =>
           import('../student/student.routes').then((m) => m.STUDENT_ROUTE),
      },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }