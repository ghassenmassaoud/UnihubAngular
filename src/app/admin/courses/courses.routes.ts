import { AllCourseComponent } from './all-course/all-course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AboutCourseComponent } from './about-course/about-course.component';
import { Route } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { PostsComponent } from 'app/posts/all-posts/posts.component';
import { AboutPostsComponent } from 'app/posts/about-posts/about-posts.component';
import { AddPostsComponent } from 'app/posts/add-posts/add-posts.component';
import { CouresesComponent } from 'app/coureses/coureses.component';

export const COURSE_ROUTE: Route[] = [
  // {
  //   path: 'all-courses',
  //   component: AllCourseComponent,
  // },
  {
    path: 'all-courses',
    component: PostsComponent,
  },
  {
    path: 'add-course',
    component: AddPostsComponent,
  },
  {
    path: 'edit-course',
    component: EditCourseComponent,
  },
  {
    path: 'about-course',
    component: AboutPostsComponent,
  },
  { path: '**', component: Page404Component },
];
