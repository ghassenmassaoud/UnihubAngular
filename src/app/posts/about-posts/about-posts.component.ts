import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { SortService } from 'app/PopularPost';
import { Comment } from 'app/models/comment';
import { MyPosts } from 'app/models/my-posts';
import { LikeAction } from 'app/models/post-like';
import { PostsService } from 'app/posts.service';

@Component({
  selector: 'app-about-posts',
  standalone: true,
  imports: [  
      CommonModule,
      MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    FileUploadComponent,
    MatButtonModule,MatIconModule
  ],
  templateUrl: './about-posts.component.html',
  styleUrl: './about-posts.component.scss',
  providers: [PostsService]
})
export class AboutPostsComponent {
  postId!: number;
  post: any; // Utilisez le type approprié pour votre modèle Post
  comment: Comment[] = []; 
  topThreePosts: MyPosts[] = [];
  allPosts: MyPosts[] = [];
  allTags: string[] = [];
  isReported: boolean = false;



  // Définissez la propriété comments pour stocker les commentaires


  constructor(private route: ActivatedRoute,private router: Router, private ps: PostsService,private sortService: SortService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = Number(params.get('postId')); // Utilisez 'postId' au lieu de 'id'
      this.loadPost();
    });
    this.loadAllPosts();
    this.ps.getPosts().subscribe(posts => {
      // Extraire les tags de tous les posts
      this.allTags = this.extractTagsFromPosts(posts);
    });


  }

  reportPost(): void {
    this.ps.ReportPost(this.postId).subscribe({
      next: () => {
        this.isReported = true;
        // Mettez à jour localement l'état de signalement du post
        console.log('Post marked as reported.');

      },
      error: (error) => {
        console.error('Error marking post as reported:', error);
      },
    });
  }

  unreportPost(): void {
    this.ps.UnReportPost(this.postId).subscribe({
      next: () => {
        this.isReported = false;
        // Mettez à jour localement l'état de signalement du post
        console.log('Post unmarked as reported.');

      },
      error: (error) => {
        console.error('Error unmarking post as reported:', error);
      },
    });
  }

  
  extractTagsFromPosts(posts: MyPosts[]): string[] {
    let tags: string[] = [];
    posts.forEach(post => {
      // Ajouter tous les tags de ce post à la liste de tags
      tags = tags.concat(post.tags);
    });
    // Supprimer les doublons (si nécessaire)
    tags = Array.from(new Set(tags));
    return tags;
  }

  loadPost(): void {
    if (this.postId) {
      this.ps.getPostById(this.postId).subscribe({
        next: (data) => {
          this.post = data;
        //  this.comments = data.comments;
          console.log('Post details:', this.post);
          this.getTopThreePosts(); 
          // Appel de la méthode pour trier les trois premiers posts après avoir chargé le post

        },
        error: (error) => {
          console.error('Error fetching post:', error);
        }
      });
    }}
    likePost(): void {
      this.ps.addPostAction(this.postId,1, LikeAction.like).subscribe({
          next: (data) => {
              // Update post details after successful like action
              this.post = data;
          },
          error: (error) => {
              console.error('Error liking post:', error);
          }
      });
  }
  lovePost(): void {
    this.ps.addPostAction(this.postId, 1,LikeAction.love).subscribe({
        next: (data) => {
            // Update post details after successful like action
            this.post = data;
        },
        error: (error) => {
            console.error('Error liking post:', error);
        }
    });
}
solutionPost(): void {
  this.ps.addPostAction(this.postId,1, LikeAction.solution).subscribe({
      next: (data) => {
          // Update post details after successful like action
          this.post = data;
      },
      error: (error) => {
          console.error('Error liking post:', error);
      }
  });
}
instructivePost(): void {
  this.ps.addPostAction(this.postId,1, LikeAction.instructive).subscribe({
      next: (data) => {
          // Update post details after successful like action
          this.post = data;
      },
      error: (error) => {
          console.error('Error liking post:', error);
      }
  });
}
dislikePost(): void {
  this.ps.addPostAction(this.postId, 1,LikeAction.dislike).subscribe({
      next: (data) => {
          // Update post details after successful like action
          this.post = data;
      },
      error: (error) => {
          console.error('Error liking post:', error);
      }
  });
}
loadAllPosts(): void {
  this.ps.getPosts().subscribe({
    next: (data) => {
      this.allPosts = data;
      this.getTopThreePosts();
    },
    error: (error) => {
      console.error('Error fetching all posts:', error);
    }
  });
}

getTopThreePosts(): void {
  this.topThreePosts = this.sortService.getTopThreeByLikes(this.allPosts);
}
  }


