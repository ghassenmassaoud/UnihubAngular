import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
//import { MyPosts} from 'app/models/my-posts';
import { User } from 'app/models/user';
import { PostsService } from 'app/posts.service';
import { UploadService } from 'app/upload.service';
import { MyPosts, Status } from 'app/models/my-posts';
import { tagValidators } from 'app/tagValidator';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { WordCheckService } from 'app/wordchek';



@Component({
  selector: 'app-add-posts',
  standalone: true,
  imports: [   
     CommonModule,
     FormsModule,
     ReactiveFormsModule,
     MatFormFieldModule,
     MatInputModule,
     MatDatepickerModule,
     MatSelectModule,
     MatOptionModule,
     FileUploadComponent,
     MatButtonModule,
     
         MatIconModule

  ],
  providers: [PostsService],
  templateUrl: './add-posts.component.html',
  styleUrl: './add-posts.component.scss'
})

export class AddPostsComponent {
  postForm: FormGroup;
 // status: string[] = ['Published', 'Draft', 'Trash', 'Pending']; // Fixed typo in 'Trash'
 status!: Status[];  selectedFile: File | null = null;

 constructor(private formBuilder: FormBuilder, private postService: PostsService, private router: Router,private wordCheckService: WordCheckService) {
    this.postForm = this.formBuilder.group({
      user: [{ idUser: '1' }],
      title: ['', Validators.required],
      content: ['', Validators.required],
      // tags: [[],tagValidators()],
      tags: [[],Validators.required,],
      //tags: [[], [Validators.required, Validators.pattern('#[a-zA-Z0-9]+')]],

      datePost: [null, Validators.required],
      likes: [0],
      views: [0],
      status: ['', Validators.required],
      report: [false],
      attachment: ['']
    });
    this.status = Object.values(Status);

  }

 
  onSubmit() {
    if (this.postForm.invalid) {
      console.log('Form is invalid');
      return;
    }
    
    const title = this.postForm.get('title')!.value;
    const content = this.postForm.get('content')!.value;

    if (this.wordCheckService.containsBadWords(title) || this.wordCheckService.containsBadWords(content)) {
      alert('Your post contains inappropriate content.');
      return;
    }



    const formData = new FormData();
    formData.append('userId', '1');

    formData.append('title', this.postForm.get('title')!.value);
    formData.append('content', this.postForm.get('content')!.value);
    const datePostValue = new Date(this.postForm.get('datePost')!.value);
    const formattedDate = datePostValue.toISOString().split('T')[0]; // Extract date part without time
    formData.append('datePost', formattedDate);
        formData.append('status', this.postForm.get('status')!.value);
        formData.append('tags', this.postForm.get('tags')!.value);

    formData.append('likes', this.postForm.get('likes')!.value);
    formData.append('views', this.postForm.get('views')!.value);

    const fileInput = this.postForm.get('attachment')!.value;
if (fileInput && fileInput instanceof File) {
  formData.append('attachment', fileInput, fileInput.name);
}

    // const fileInput = this.postForm.get('attachment')!.value;
    // if (fileInput && fileInput.length > 0) {
    //   for (const file of fileInput) {
    //     if (file instanceof Blob || file instanceof File){
    //     formData.append('file', file);
    //     }}
    // }
    //     const fileInput = this.postForm.get('attachment')!.value;

    // if (fileInput && fileInput.length > 0) {
    //   for (const file of fileInput) {
    //     if (file instanceof Blob || file instanceof File) { // Vérifiez le type du fichier
    //       formData.append('file', file, file.name); // Utilisez append avec les bons paramètres
    //     }
    //   }
    // }

    this.postService.addPost(formData, 1).subscribe({
      next: (response) => {
        console.log('Post added successfully:', response);
        this.router.navigate(['/blog']);

        // Add any additional handling logic here
      },
      error: (error) => {
        console.error('Error adding post:', error);
        // Handle error appropriately
      }
    });
  }
  navigateToBlogs() {
    this.router.navigate(['/blog']);
  }

  
}
