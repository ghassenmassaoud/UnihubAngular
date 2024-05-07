import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'app/Pi-User/home/home.component';
import { ProfileComponent } from 'app/Pi-User/profile/profile.component';
import { AboutClassroomStudentComponent } from 'app/student/about-classroom-student/about-classroom-student.component';
import { ListClassrromStudentComponent } from 'app/student/list-classrrom-student/list-classrrom-student.component';
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


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }