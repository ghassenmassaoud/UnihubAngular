import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from 'app/Pi-User/Service/auth.service';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit{
  authForm!: UntypedFormGroup;
  submitted = false;
   loading = false;
  error = '';
  returnUrl!: string;
  hide = true;
  chide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    // stop here if form is invalid


    if (this.authForm.valid) {
      this.authService.Register(this.f['firstName'].value, this.f['lastName'].value, this.f['password'].value,
      this.f['email'].value ).subscribe({
        next: (res) =>{
          console.log(res)
     if(res!=null){
       setTimeout(() => {
        this.router.navigate(['/authentication/signin']);
                //  const role = (decodedAccessToken as any).role[0].authority;
                //  localStorage.setItem('access_token', JSON.stringify(res.access_token));
                //  localStorage.setItem('refresh_token', JSON.stringify(res.refresh_token));
                //  if ( role === "ROLE_ADMIN") {

                //  } else if (role === "ROLE_TEACHER") {
                //    this.router.navigate(['/teacher/dashboard']);
                //  } else if (role === "ROLE_STUDENT") {
                //    this.router.navigate(['/student/dashboard']);
                //  } else {
                //    this.router.navigate(['/authentication/signin']);
                //  }
                  this.loading = false;
               }, 1000);
     } else {
       this.error = 'Invalid Login';
     }
   },
   error: (error) => {
     this.error = error;
     this.submitted = false;
      this.loading = false;
   },
 });
  }
}


}