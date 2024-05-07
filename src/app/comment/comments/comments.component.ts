import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { CommentsService } from 'app/comments.service';
import { Comment } from 'app/models/comment';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatInputModule,
    NgScrollbarModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    FileUploadComponent,
    MatButtonModule,MatIconModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit{
  allComments: Comment[] = [];
  numberOfComments: number = 0;

  constructor(private cs: CommentsService) {}

  ngOnInit() {
    this.cs.getComments().subscribe(data => {
      this.allComments = data.filter(comment => !comment.parentComment);
      this.numberOfComments = this.allComments.length; // Calcul du nombre de commentaires

    });
  }

  
}
