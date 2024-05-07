import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { CommentsService } from 'app/comments.service';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-about-comment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    NgScrollbarModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    FileUploadComponent,
    MatButtonModule,MatIconModule

  ],
  templateUrl: './about-comment.component.html',
  styleUrl: './about-comment.component.scss'
})
export class AboutCommentComponent implements OnInit{
  commentId!: number;
  comment: any; 
  repliesCount: number = 0; // Propriété pour stocker le nombre de réponses

  constructor(private route: ActivatedRoute,private router: Router, private cs: CommentsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.commentId = Number(params.get('commentId')); // Utilisez 'postId' au lieu de 'id'
      this.loadComment();
    });
  }

  calculateRepliesCount(): void {
    if (this.comment && this.comment.replies) {
      this.repliesCount = this.comment.replies.length; // Calcul du nombre de réponses
      console.log('Number of replies:', this.repliesCount);
    } else {
      console.warn('No replies found.');
    }
  }
  



    loadComment(): void {
      if (this.commentId) {
        this.cs.getCommenttById(this.commentId).subscribe({
          next: (data) => {
            this.comment= data;
            console.log('Comments details:', this.comment);
            this.calculateRepliesCount(); // Appeler la fonction pour calculer le nombre de réponses
          },
          error: (error) => {
            console.error('Error fetching post:', error);
          }
        });
      }
    }


}
