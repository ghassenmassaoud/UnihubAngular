import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; 
import { APP_ROUTE } from './app.routes';
import { AppComponent } from './app.component';

import { MyprofileComponent } from './myprofile/myprofile.component';
import { MyclubComponent } from './myclub/myclub.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { ClubJoinedComponent } from './club-joined/club-joined.component';
import { EventJoinedComponent } from './event-joined/event-joined.component';

@NgModule({
  declarations: [
    AppComponent,
    MyprofileComponent,
    MyclubComponent,
    ClubDetailComponent,
    ClubJoinedComponent,
    EventJoinedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTE) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

