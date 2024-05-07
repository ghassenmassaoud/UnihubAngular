import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from 'app/Pi-User/Service/auth.service';
import { jwtDecode } from 'jwt-decode';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const customInterceptor: HttpInterceptorFn = (request, next) => {

const authenticationService = inject(AuthService);
if (!request.url.includes('/api/auth')) {
    // add authorization header with jwt token if available
    let access_token= localStorage.getItem('access_token');
    console.log(access_token)

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    }

    return next(request).pipe(
      catchError((error:HttpErrorResponse) => {

        if (error?.status === 403) {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Session has expired. Refreshing...',
          }).then((result) => {
            if (result.value) {
              authenticationService.refreshToken().subscribe(
                (res) => {
                  localStorage.setItem('access_token', JSON.stringify((res as any).access_token));
                  localStorage.setItem('refresh_token', JSON.stringify((res as any).refresh_token));
                  Swal.fire('Success', 'Session has been refreshed.', 'success');
                },
                (refreshError) => {
                  // Handle refresh token error
                  Swal.fire('Error', 'Failed to refresh session.', 'error');
                }
              );

            }
          });
          return throwError(() => error);
        } else {
          // For other errors, re-throw the error
          return throwError(() => error);
        }
      })
    );

}