import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SortService } from 'app/PopularPost';
import { CommentsService } from 'app/comments.service';
import { PostsService } from 'app/posts.service';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { WordCheckService } from 'app/wordchek';
import { StateService } from 'app/state.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-user-add-posts',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    NgScrollbarModule,
    MatOptionModule,
    MatCheckboxModule,
    MatIconModule,
    CKEditorModule,    MatButtonModule,],
  templateUrl: './user-add-posts.component.html',
  styleUrl: './user-add-posts.component.scss',
  providers:[PostsService]
})
export class UserAddPostsComponent {
  postForm: FormGroup;
  postId!: number  | undefined;
  public Editor = ClassicEditor;
  editorContent: string = '<p>Hello, world!</p>';

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private wordCheckService: WordCheckService,private stateService: StateService, private cs: CommentsService,private router: Router, private ps: PostsService, private sortService: SortService) {
    this.postForm = this.formBuilder.group({
      user: [{ idUser: '1' }],
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: [[], [Validators.required, Validators.pattern('#[a-zA-Z0-9]+')]],
      datePost: [null, Validators.required],
    });
  }


  onSubmit() {

    const title = this.postForm.get('title')!.value;
    const content = this.postForm.get('content')!.value;

    if (this.wordCheckService.containsBadWords(title) || this.wordCheckService.containsBadWords(content)) {
      alert('Your post contains inappropriate content.');
      return;
    }

    const formData = new FormData();
    formData.append('userId', '1');
    formData.append('title', title);
    formData.append('content', content);
    formData.append('datePost', new Date().toISOString().split('T')[0]);
    formData.append('tags', this.postForm.get('tags')!.value);

    this.ps.addPost(formData, 1).subscribe({
      next: (response) => {
        console.log('Post added successfully:', response);
        this.router.navigate(['/main/post', response.postId]);
      },
      error: (error) => {
        console.error('Error adding post:', error);
      },
    });
  }


  navigateToPosts() {
    if (this.postId) {
      this.router.navigate(['./blog-details', this.postId]);
    } else {
      console.log('Post ID is undefined.');
    }
  }

}
