import { Route } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { EditCommentComponent } from 'app/comment/edit-comment/edit-comment.component';
import { AboutPostsComponent } from 'app/posts/about-posts/about-posts.component';
import { AddPostsComponent } from 'app/posts/add-posts/add-posts.component';
import { PostsComponent } from 'app/posts/all-posts/posts.component';
import { EditPostsComponent } from 'app/posts/edit-posts/edit-posts.component';
import { DemandeListeComponent } from 'app/student/demande-liste/demande-liste.component';

export const ADMIN_ROUTE: Route[] = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTE),
  },
  {
    path: 'postAdmin',
    component: PostsComponent,
    loadChildren: () =>
      import('../blog/blog.routes').then((m) => m.BLOG_ROUTE),
  },
  {
    path: 'post-details/:postId',
    component: AboutPostsComponent,
    loadChildren: () =>
      import('../blog-details/blog-deatils.routes').then((m) => m. BLOGDETAILS_ROUTE),
  },
  {
    path: 'contact',
    component: EditCommentComponent,
    loadChildren: () =>
      import('../contact/contact.routes').then((m) => m.CONTACT_ROUTE),
  },
  {
    path: 'about/:postId',
    component: EditPostsComponent,
    loadChildren: () =>
      import('../about/about.routes').then((m) => m.ABOUT_ROUTE),
  },
  {
    path: 'profile',
    component: AddPostsComponent,
    loadChildren: () =>
      import('../profile/profile.routes').then((m) => m.PROFILE_ROUTE),
  },
  {
    path: 'teachers',
    loadChildren: () =>
      import('./teachers/admin-teachers.routes').then(
        (m) => m.ADMIN_TEACHER_ROUTE
      ),
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./students/admin-students.routes').then(
        (m) => m.ADMIN_STUDENT_ROUTE
      ),
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./courses/courses.routes').then((m) => m.COURSE_ROUTE),
  },
  {
    path: 'library',
    loadChildren: () =>
      import('./library/library.routes').then((m) => m.LIBRARY_ROUTE),
  },
  {
    path: 'departments',
    loadChildren: () =>
      import('./departments/departments.routes').then(
        (m) => m.DEPARTMENT_ROUTE
      ),
  },
  {
    path: 'staff',
    loadChildren: () =>
      import('./staff/staff.routes').then((m) => m.STAFF_ROUTE),
  },
  {
    path: 'holidays',
    loadChildren: () =>
      import('./holidays/holidays.routes').then((m) => m.HOLIDAY_ROUTE),
  },
  {
    path: 'fees',
    loadChildren: () => import('./fees/fees.routes').then((m) => m.FEES_ROUTE),
  },
  {
    path: 'attendance',
    loadChildren: () =>
      import('./attendance/attendance.routes').then((m) => m.ATTENDANCE_ROUTE),
  },
  { path: '**', component: Page404Component },
];
