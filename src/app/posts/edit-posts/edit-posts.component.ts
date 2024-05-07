import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { Status } from 'app/models/my-posts';
import { PostsService } from 'app/posts.service';
import { WordCheckService } from 'app/wordchek';

@Component({
  selector: 'app-edit-posts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    FileUploadComponent,
    MatButtonModule
  ],
  providers: [PostsService],
  templateUrl: './edit-posts.component.html',
  styleUrl: './edit-posts.component.scss'
})
export class EditPostsComponent {
  postForm: FormGroup;
  status!: Status[]; 
  postId!: number;
  selectedFile: File | null = null;

  constructor(private formBuilder: FormBuilder, private ps: PostsService, private route: ActivatedRoute,
    private router: Router,private wordCheckService: WordCheckService) {
    this.postForm = this.formBuilder.group({
      user: [{ idUser: '1' }],
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: [[],Validators.required],
      datePost: [null, Validators.required],
      likes: [0],
      views: [0],
      status: ['', Validators.required],
      report: [false],
    });
  }
  
  ngOnInit(): void {
    this.status = Object.values(Status);
    this.route.params.subscribe(params => {
      this.postId = +params['postId'];
      console.log('Post ID:', this.postId);
      this.getPostDetails(this.postId);  
    });
  }
  getPostDetails(postId: number): void {
    console.log('Fetching post details for ID:', postId);
    this.ps.getPostById(postId).subscribe(
      (post) => {
        this.postForm.patchValue({
          user: [{ idUser: '1' }], 
          title: post.title,
          content: post.content,
          tags: post.tags,
          datePost: post.datePost,
          likes: post.likes,
          views: post.views,
          status: post.status,
          report: post.report,
        });
      },
      (error) => {
        console.error('Error getting post details:', error);
      }
    );
  }
  navigateToBlog() {
    this.router.navigate(['/blog']);
  }

  editPost(userId: number, postId: number) {
    const formData = new FormData();
    formData.append('title', this.postForm.get('title')?.value);
    formData.append('content', this.postForm.get('content')?.value);
    formData.append('tags', this.postForm.get('tags')?.value);
    formData.append('datePost', this.postForm.get('datePost')?.value);
    formData.append('likes', this.postForm.get('likes')?.value);
    formData.append('views', this.postForm.get('views')?.value);
    formData.append('status', this.postForm.get('status')?.value);
    formData.append('report', this.postForm.get('report')?.value);

    return this.ps.editPost(userId, postId, formData).subscribe(
      (response) => {
        console.log('Post edited successfully:', response);
        this.router.navigate(['/blog']);
      },
      (error) => {
        console.error('Error editing post:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
  onSubmit(): void {
    const title = this.postForm.get('title')!.value;
    const content = this.postForm.get('content')!.value;

    if (this.wordCheckService.containsBadWords(title) || this.wordCheckService.containsBadWords(content)) {
      alert('Your post contains inappropriate content.');
      return;
    }

    if (this.postForm.valid  && this.postId) {
      const userId = 1; 
      const postId = this.postId; 
      this.editPost(userId, postId); 
    } else {
      console.error('Form is invalid');
    }
  }

}