import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Role } from '@core';
import Swal from 'sweetalert2';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'app/Pi-User/Service/auth.service';
import { jwtDecode } from "jwt-decode";
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ RouterLink,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get('email')?.setValue('admin@school.org');
    this.authForm.get('password')?.setValue('admin@123');
  }
  teacherSet() {
    this.authForm.get('email')?.setValue('teacher@school.org');
    this.authForm.get('password')?.setValue('teacher@123');
  }
  studentSet() {
    this.authForm.get('email')?.setValue('student@school.org');
    this.authForm.get('password')?.setValue('student@123');
  }
   onSubmit () {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Email and Password not valid !';
      return;
    } else {
      // this.subs.sink = this.authService
       this.authService.login(this.f['email'].value, this.f['password'].value).subscribe({
           next: (res) =>{
        if(res!=null){
          let decodedAccessToken = jwtDecode(res.access_token);

          setTimeout(() => {
                    const role = (decodedAccessToken as any).role[0].authority;
                    localStorage.setItem('access_token', res.access_token);
                    localStorage.setItem('refresh_token', res.refresh_token);
                    console.log(role)
                    if ( role === "ROLE_STAFF") {
                      this.router.navigate(['/admin/dashboard/main']);
                    } else if (role === "ROLE_TEACHER") {
                      this.router.navigate(['/teacher/dashboard']);
                    } else if (role === "ROLE_STUDENT") {
                      this.router.navigate(['/main/home']);
                    } else {
                      this.router.navigate(['/authentication/signin']);
                    }
                    this.loading = false;
                  }, 1000);
        } else {
          this.error = 'Invalid Login';
        }
      },
      error: (error) => {
        if (error.status === 0) {
          // Network error, connection refused
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Failed to connect to the server. Please try again later.',
          });
      } else {
          // Handle other HTTP errors
          console.log(error.error);
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.error || 'An unexpected error occurred.' ,
          });
      }
      this.error = "Invalid Login";
      this.submitted = false;
      this.loading = false;
      },
    });
}
}
}







        // .subscribe({
        //   next: (res) => {
        //     if (res) {
        //       setTimeout(() => {
        //         const role = this.authService.currentUserValue.role;
        //         if (role === Role.All || role === Role.Admin) {
        //           this.router.navigate(['/admin/dashboard/main']);
        //         } else if (role === Role.Teacher) {
        //           this.router.navigate(['/teacher/dashboard']);
        //         } else if (role === Role.Student) {
        //           this.router.navigate(['/student/dashboard']);
        //         } else {
        //           this.router.navigate(['/authentication/signin']);
        //         }
        //         this.loading = false;
        //       }, 1000);
        //     } else {
        //       this.error = 'Invalid Login';
        //     }
        //   },

        // });




