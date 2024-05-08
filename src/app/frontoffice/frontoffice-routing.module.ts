import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'app/Pi-User/home/home.component';
import { ProfileComponent } from 'app/Pi-User/profile/profile.component';
import { ClubDetailComponent } from 'app/club-detail/club-detail.component';
import { ClubJoinedComponent } from 'app/club-joined/club-joined.component';
import { EventJoinedComponent } from 'app/event-joined/event-joined.component';
import { EventListComponent } from 'app/event-list/event-list.component';
import { MyclubComponent } from 'app/myclub/myclub.component';
import { MyprofileComponent } from 'app/myprofile/myprofile.component';
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
    // {path:'home',component:MyclubComponent},

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
      {
        path: 'EventJoined/:idUtilisateur',
        component: EventJoinedComponent,
        loadChildren: () =>
          import('../home/home.routes').then((m) => m.HOME_ROUTE),
      },
      {
        path: 'profileClub/:idUser/:idClub',
        component: MyprofileComponent,
        // loadChildren: () =>
        //   import('../profile/profile.routes').then((m) => m.PROFILE_ROUTE),
      },
      {
        path: 'eventList',
        component: EventListComponent,
        loadChildren: () =>
          import('../event-side-bar/event-side-bar.routes').then((m) => m.EVENTSIDEBAR_ROUTE),
      },
      {
        path: 'ClubJoined/:id',
        component: ClubJoinedComponent,
        loadChildren: () =>
          import('../coureses-list/coureses-list.routes').then((m) => m.COURESESLIST_ROUTE),
      },
      {
        path: 'ClubDetail/:id',
        component: ClubDetailComponent,
        loadChildren: () =>
          import('../coureses-single/coureses-single.routes').then((m) => m.COURESESSINGLE_ROUTE),
      },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }