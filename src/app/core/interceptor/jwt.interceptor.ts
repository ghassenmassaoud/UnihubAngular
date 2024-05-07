import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable,catchError,throwError } from 'rxjs';
import { AuthService } from '../../Pi-User/Service/auth.service';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let access_token= localStorage.getItem('access_token');
    console.log(access_token)
    let decodedAccessToken = jwtDecode(access_token as any);
    if (decodedAccessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${decodedAccessToken}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse) => {

        if (error?.status === 403) {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Session has expired. Refreshing...',
          }).then((result) => {
            if (result.value) {
              this.authenticationService.refreshToken().subscribe(
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
}
