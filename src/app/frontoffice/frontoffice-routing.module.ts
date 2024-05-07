import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'app/Pi-User/home/home.component';
import { ProfileComponent } from 'app/Pi-User/profile/profile.component';
import { UserAddPostsComponent } from 'app/posts/user-add-posts/user-add-posts.component';
import { UserDetailsPostsComponent } from 'app/posts/user-details-posts/user-details-posts.component';
import { UserpostsComponent } from 'app/posts/userposts/userposts.component';
import { ResourceSpaceComponent } from 'app/resource-space/resource-space.component';
import { ResourcesComponent } from 'app/resources/resources.component';
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
      {
        path: 'posts',
        component: UserpostsComponent,
        loadChildren: () =>
          import('../event-side-bar/event-side-bar.routes').then((m) => m.EVENTSIDEBAR_ROUTE),
      },
      {

        path: 'post/:postId',
        component: UserDetailsPostsComponent,
        loadChildren: () =>
          import('../home-seconde/HomeSeconde.routes').then((m) => m.HOMESECONDE_ROUTE),
      },
      {
        path: 'share',
        component: UserAddPostsComponent,
        loadChildren: () =>
          import('../event/event.routes').then((m) => m.EVENT_ROUTE),
      },
      {
        path:'resources',
        component:ResourcesComponent,
        loadChildren:()=>
          import('../resources/resources.routes').then((m) => m.Ressource_Route)
      },
      {
        path:'spaces',
        component:ResourceSpaceComponent,
        loadChildren:()=>
          import('../resource-space/resource-space.routes').then((m) => m.Space_Route)
      },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }