import { Route } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { AttendanceSheetComponent } from './attendance-sheet/attendance-sheet.component';
import { StaffAttendanceComponent } from './staff-attendance/staff-attendance.component';
import { AttendanceDetailComponent } from './attendance-detail/attendance-detail.component';
import { DemandeListeComponent } from './demande-liste/demande-liste.component';

export const ATTENDANCE_ROUTE: Route[] = [
  {
    path: 'staff',
    component: StaffAttendanceComponent,
  },
  {
    path: 'details',
    component: AttendanceDetailComponent,
  },
  {
    path: 'attendance-sheet',
    component: AttendanceSheetComponent,
  },
  {
    path: 'Demands',
    component: DemandeListeComponent,
  },
  { path: '**', component: Page404Component },
];
