import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'app/Pi-User/home/home.component';
import { ProfileComponent } from 'app/Pi-User/profile/profile.component';
const routes: Routes = [

    {path:'home',component:HomeComponent},

    {
        path: 'profile',
        component: ProfileComponent,
        loadChildren: () =>
          import('../Pi-User/profile/profile.routes').then((m) => m.PROFILE_ROUTE),
      },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }