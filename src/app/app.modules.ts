import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'; // Importez RouterModule ici
import { APP_ROUTE } from './app.routes';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/all-posts/posts.component';
import { AboutPostsComponent } from './posts/about-posts/about-posts.component';
import { AddPostsComponent } from './posts/add-posts/add-posts.component';

@NgModule({
  declarations: [
    // AppComponent,
    // PostsComponent,
    // AboutPostsComponent,
    // AddPostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTE) // Configurez les routes ici en utilisant RouterModule.forRoot
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }