import { Component } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { User } from '../Models/User';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { jwtDecode } from 'jwt-decode';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [BreadcrumbComponent, MatProgressSpinnerModule,CommonModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,],
  templateUrl: './profile.component.html',
  styleUrls: ['../../../assets/css/menus.css','../../../assets/css/animate.css','../../../assets/css/owl.carousel.css','../../../assets/fonts/elegant-icon.css','../../../assets/css/magnific-popup.css',
  '../../../assets/css/animations.css','../../../assets/css/style.css','../../../assets/css/custom-spacing.css','../../../assets/css/responsive.css'
]
})
export class ProfileComponent {
  updateForm!: UntypedFormGroup;
  resetForm!: UntypedFormGroup;
  constructor(private userAuth:AuthService,private router: Router,private formBuilder: UntypedFormBuilder, private authService: AuthService){

  }
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  user!:User
  currentUser:boolean = false

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      number: ['', Validators.required],
      speciality: ['', Validators.required],

    });
    this.resetForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],

    });
    this.loadJsFiles();
    let access_token= localStorage.getItem('access_token');
    if (access_token) {

       this.userAuth.GetOneUser().subscribe(res=> {
       this.user = res
       this.updateForm = this.formBuilder.group({
        email: [this.user.email, [Validators.required,Validators.email]],
        firstName: [this.user.firstName, Validators.required],
        lastName: [this.user.lastName, Validators.required],
        number: [this.user.number, Validators.required],
        speciality: [this.user.speciality, Validators.required],

      });

       let decodedAccessToken = jwtDecode(access_token as any) as any;
      if(decodedAccessToken.sub==this.user.email){
        this.currentUser = true

      }else{
        this.currentUser = false
      }
        return res
      }) as any



    }else{
      this.router.navigate(['/main/home']);
    }
}
get f() {
  return this.updateForm.controls;
}
get g() {
  return this.resetForm.controls;
}
onReset(){
this.submitted = true;
   this.loading = true;
  this.error = '';
  if (this.resetForm.invalid) {
    this.error = 'Password not valid !';
    return;
  }
  else {

     this.authService.resetPassword(this.g['currentPassword'].value,this.g['newPassword'].value,this.g['confirmPassword'].value,this.user.idUser).subscribe({
         next: (res) =>{
      if(res!=null){
        // let decodedAccessToken = jwtDecode(res.access_token);

        setTimeout(() => {

                  this.ngOnInit()
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'changes has been saved',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  this.loading = false;
                }, 1000);
      } else {
        this.error = '';
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

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error || 'An unexpected error occurred.',
        });
    }
    this.error = "Invalid Login";
    this.submitted = false;
    this.loading = false;
    },
  });
}
}
onSubmit () {

  this.submitted = true;
   this.loading = true;
  this.error = '';
  if (this.updateForm.invalid) {
    this.error = 'Email and Password not valid !';
    return;
  } else {
    // this.subs.sink = this.authService
    this.user.email = this.f['email'] .value
    this.user.speciality = this.f['speciality'] .value
    this.user.number = this.f['number'] .value
    this.user.firstName = this.f['firstName'] .value
    this.user.lastName = this.f['lastName'] .value

     this.authService.updateUser(this.user).subscribe({
         next: (res) =>{
      if(res!=null){
        // let decodedAccessToken = jwtDecode(res.access_token);

        setTimeout(() => {
                  // const role = (decodedAccessToken as any).role[0].authority;
                  // localStorage.setItem('access_token', res.access_token);
                  // localStorage.setItem('refresh_token', res.refresh_token);
                  // if ( role === "ROLE_ADMIN") {
                  //   this.router.navigate(['/admin/dashboard/main']);
                  // } else if (role === "ROLE_TEACHER") {
                  //   this.router.navigate(['/teacher/dashboard']);
                  // } else if (role === "ROLE_STUDENT") {
                  //   this.router.navigate(['/home']);
                  // } else {
                  //   this.router.navigate(['/authentication/signin']);
                  // }

                  this.ngOnInit()
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'changes has been saved',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  this.loading = false;
                }, 1000);
      } else {
        this.error = '';
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

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error || 'An unexpected error occurred.',
        });
    }
    this.error = "Invalid Login";
    this.submitted = false;
    this.loading = false;
    },
  });
}
}
loadJsFiles(): void {
  this.loadExternalScript(" ../../../assets/js/main.js");
  //  this.loadExternalScript(" ../../assets/js/menus.js");
  //  this.loadExternalScript(" ../../assets/js/jquery.min.js");
  // this.loadExternalScript(" ../../assets/js/modernizr-2.8.3.min.js");
  // this.loadExternalScript(" ../../assets/js/bootstrap.min.js");
  // this.loadExternalScript(" ../../assets/js/owl.carousel.min.js");
  // this.loadExternalScript(" ../../assets/js/jquery.magnific-popup.min.js");
  // this.loadExternalScript(" ../../assets/js/jquery.counterup.min.js");
  // this.loadExternalScript(" ../../assets/js/waypoints.min.js");
  // this.loadExternalScript(" ../../assets/js/wow.min.js");
  // this.loadExternalScript(" ../../assets/js/isotope.pkgd.min.js");
  // this.loadExternalScript(" ../../assets/js/imagesloaded.pkgd.min.js");
  // this.loadExternalScript(" ../../assets/js/plugins.js");



}
loadExternalScript(url: string): void {
  this.loadScript(url)
    .then(() => {
      console.log('Script loaded successfully');
    })
    .catch((error) => {
      console.error('Script loading failed:', error);
    });
}
loadScript(url: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const scriptElement = document.createElement('script');
    scriptElement.src = url;

    scriptElement.onload = () => {
      resolve();
    };

    scriptElement.onerror = (error) => {
      reject(error);
    };

    document.body.appendChild(scriptElement);
  });
}
}

