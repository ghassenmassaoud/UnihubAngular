import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { CommentsService } from 'app/comments.service';
import { Comment } from 'app/models/comment';
import { WordCheckService } from 'app/wordchek';
import { number } from 'echarts';

@Component({
  selector: 'app-edit-comment',
  standalone: true,
  imports: [CommonModule, FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatOptionModule,
    FileUploadComponent,
    MatButtonModule,MatIconModule],
  templateUrl: './edit-comment.component.html',
  styleUrl: './edit-comment.component.scss'
})
export class EditCommentComponent {
  comments: Comment[] = [];
  // commentForm: FormGroup;
  commentId!: number;

  postId!: number;
  
// editedComment: any = {};
 constructor( private route: ActivatedRoute
 ,private cs: CommentsService,private formBuilder: FormBuilder, private router: Router,private wordCheckService: WordCheckService){}
// this.commentForm = this.formBuilder.group({
//   content: ['', Validators.required],
//   commentDate: [ Validators.required],
//   likes: [0],
//   report: [false],
// });}
// editComment(commentId: number): void { 
//   const formData = new FormData();
//   formData.append('content', this.commentForm.get('content')?.value);
//   formData.append('commentDate', this.commentForm.get('commentDate')?.value.toString());
//   formData.append('likes', this.commentForm.get('likes')?.value);
//   formData.append('report', this.commentForm.get('report')?.value);// Ne passez pas `this.postId` en paramètre, car il est déjà accessible dans la classe
//   if (this.postId) {
//     this.cs.editComment(commentId, this.postId, formData).subscribe(
//       response => {
//         console.log('Comment edited successfully:', response);
//         // Mettez à jour votre interface utilisateur ou effectuez d'autres actions nécessaires après l'édition du commentaire
//       },
//       error => {
//         console.error('Error editing comment:', error);
//         // Gérez les erreurs et informez l'utilisateur en conséquence
//       }
//     );
//   } else {
//     console.error('Post ID is required to edit the comment.');
//     // Informez l'utilisateur que l'identifiant de la publication est requis pour éditer le commentaire
//   }
// }
// getCommentDetails(commentId: number): void {

//   // Pré-remplissez le formulaire avec les données du commentaire à éditer
//   const commentToEdit = this.comments.find(comment => comment.commentId === commentId);
//   if (commentToEdit) {
//     this.commentForm.patchValue({
//       content: commentToEdit.content,
//       commentDate: commentToEdit.commentDate,
//       likes: commentToEdit.likes,
//       report: commentToEdit.report
//     });
//   }
// }

// onSubmit(): void {
//   const content = this.commentForm.get('content')!.value;

//   if (this.wordCheckService.containsBadWords(content)) {
//     alert('Your comment contains inappropriate content.');
//     return;
//   }
//   const formData = new FormData();
//   const dateCommentValue = new Date(this.commentForm.get('commentDate')!.value);
//   console.log('Date before conversion:', dateCommentValue);
  
//   const isoDate = dateCommentValue.toISOString().split('T')[0]; // Assuming you only need the date part
//   console.log('ISO Date:', isoDate);
  
//   formData.append('commentDate', isoDate);

//   formData.append('likes', this.commentForm.get('likes')!.value);
//   if (this.commentForm.valid  && this.postId) {
//     // Le formulaire est valide, vous pouvez traiter les données ici
//     const commentId = this.commentId; // Utilisez l'ID du post que vous avez récupéré
//     this.editComment(commentId); // Appelez la méthode editPost pour traiter la soumission
//   } else {
//     // Le formulaire n'est pas valide, affichez des messages d'erreur ou effectuez d'autres actions nécessaires
//     console.error('Form is invalid');
//   }
// }

ngOnInit() {
  this.route.paramMap.subscribe(params => {
    this.postId = Number(params.get('postId'));
    this.loadComments();
  //  this.getCommentDetails(this.commentId);
  });
}

loadComments() {
  this.cs.getCommentsForPost(this.postId).subscribe(comments => {
    this.comments = comments;
  });
}
deleteComment(commentId: number): void {
  this.cs.deleteComment(commentId).subscribe({
    next: (response) => {
      console.log('Comment deleted successfully:', response);
    },
    error: (error) => {
      console.error('Error deleting post:', error);
    }
  });

}
toggleReport(comment: any): void {
  if (comment.report) {
      this.cs.UnReportComment(comment.commentId).subscribe({
          next: () => {
            comment.report = false;
              console.log('Comment unmarked as reported.', comment.report);
          },
          error: (error) => {
              console.error('Error unmarking post as reported:', error);
          },
      });
  } else {
      this.cs.ReportComment(comment.commentId).subscribe({
          next: () => {
            comment.report = true;
              console.log('Comment marked as reported.', comment.report);
          },
          error: (error) => {
              console.error('Error marking post as reported:', error);
          },
      });
  }
}
}
