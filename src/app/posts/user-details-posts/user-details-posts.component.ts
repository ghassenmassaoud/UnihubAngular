import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { SortService } from 'app/PopularPost';
import { CommentsService } from 'app/comments.service';
import { MyPosts } from 'app/models/my-posts';
import { PostsService } from 'app/posts.service';
import { LikeAction } from 'app/models/post-like';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Comment } from 'app/models/comment';
import { StateService } from 'app/state.service';

import { WordCheckService } from 'app/wordchek';


@Component({
  selector: 'app-user-details-posts',
  standalone: true,
  imports: [ CommonModule,
     FormsModule,
     ReactiveFormsModule,
     MatFormFieldModule,
     MatInputModule,
     MatDatepickerModule,
     MatSelectModule,
     NgScrollbarModule,
     MatOptionModule,
     FileUploadComponent,
     MatButtonModule,
     
         MatIconModule],
  templateUrl: './user-details-posts.component.html',
  styleUrl: './user-details-posts.component.scss'
})
export class UserDetailsPostsComponent {

  isFavorite: boolean = false;
  userId =1;
  postId!: number;
  post: any;
  comments: Comment[] = [];
  topThreePosts: MyPosts[] = [];
  allPosts: MyPosts[] = [];
  allTags: string[] = [];
  isReported: boolean = false;
  noComments: boolean = false;
  repliesCount: number = 0;
  isLikeClicked: boolean = false;
  isLikeBold: boolean = false;
  likeBold: boolean = false;
  loveBold: boolean = false;
  solutionBold: boolean = false;
  instructiveBold: boolean = false;
  dislikeBold: boolean = false;
  unreportDisplayed = false;
  reportDisplayed = false;
  favoritePosts: number[] = [];
  filteredPosts: any[] = [];


  commentContent: string = ''; 






  constructor(private route: ActivatedRoute, private wordCheckService: WordCheckService,private stateService: StateService, private cs: CommentsService,private router: Router, private ps: PostsService, private sortService: SortService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = Number(params.get('postId'));
      console.log(this.postId);
      this.loadPost();
    });
    this.loadAllPosts();
    this.ps.getPosts().subscribe(posts => {
      this.allTags = this.extractTagsFromPosts(posts);
      this.loadFavoritePosts(); 
      this.loadLikeStatus();


    });
  }
  addNewComment() {
    if (this.commentContent.trim() !== '') {
      const newComment: Comment = new Comment();
      newComment.content = this.commentContent;
      
      this.cs.addComment(newComment, this.postId,this.userId).subscribe({
        next: () => {
          alert('Le commentaire a été ajouté avec succès.');
          this.commentContent = ''; 
        },
        error: (error) => {
          console.error('Une erreur s\'est produite lors de l\'ajout du commentaire : ', error);
          alert('Une erreur s\'est produite lors de l\'ajout du commentaire. Veuillez réessayer.');
        }
      });
    } else {
      alert('Veuillez saisir du contenu pour votre commentaire.');
    }
  }


  replyToComment(parentId: number): void {
 
    this.cs.replyComment(parentId, this.userId, this.postId)
      .subscribe(response => {
        console.log('Reply added successfully:', response);
        this.loadComments();
      }, error => {
        console.error('Error adding reply:', error);
      });
  }
  loadLikeStatus(): void {
    const storedLikes = localStorage.getItem('userLikes');
    if (storedLikes) {
      const userLikes = JSON.parse(storedLikes);
      if (userLikes[this.postId]) {
        const likeAction = userLikes[this.postId];
        switch (likeAction) {
          case LikeAction.like:
            this.likeBold = true;
            break;
          case LikeAction.love:
            this.loveBold = true;
            break;
          case LikeAction.solution:
            this.solutionBold = true;
            break;
          case LikeAction.instructive:
            this.instructiveBold = true;
            break;
          case LikeAction.dislike:
            this.dislikeBold = true;
            break;
          default:
            break;
        }
      }
    }
  }

  loadFavoritePosts(): void {
    const storedFavorites = localStorage.getItem('userFavorites');
    if (storedFavorites) {
      this.favoritePosts = JSON.parse(storedFavorites);
      this.favoritePosts.forEach(postId => {
        if (postId === this.postId) {
          this.isFavorite = true;
        }
      });
    }
  }
  ToFavorites(userId: number, postId: number): void {
    const isPostFavorite = this.favoritePosts.includes(postId);
  
    if (isPostFavorite) {
      this.ps.unfavoritePost(userId, postId).subscribe({
        next: () => {
          this.favoritePosts = this.favoritePosts.filter(id => id !== postId);
          this.isFavorite = false;
          this.updateFavoritesInLocalStorage();

        },
        error: (error) => {
          console.error('Erreur lors du retrait des favoris :', error);
        }
      });
    } else {
      this.ps.favoriteList(userId, postId).subscribe({
        next: (response: any) => {
          console.log(response);
          this.isFavorite = true;

  
          this.favoritePosts.push(postId);
          this.updateFavoritesInLocalStorage();
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout aux favoris :', error);
        }
      });
    }

  }
  
  updateFavoritesInLocalStorage(): void {
   console.log( localStorage.setItem('userFavorites', JSON.stringify(this.favoritePosts)));
  }
  
  

  toggleReport(): void {
    if (!this.post.reported) {
        this.ps.ReportPost(this.postId).subscribe({
            next: () => {
                this.post.reported = true;
                console.log('Post marked as reported.', this.post.reported);
            },
            error: (error) => {
                console.error('Error marking post as reported:', error);
            },
        });
    } else {
        this.ps.UnReportPost(this.postId).subscribe({
            next: () => {
                this.post.reported = false;
                console.log('Post unmarked as reported.', this.post.reported);
            },
            error: (error) => {
                console.error('Error unmarking post as reported:', error);
            },
        });
    }
}


  reportPost(): void {
      this.ps.ReportPost(this.postId).subscribe({
          next: () => {
              this.post.reported = true;
              this.reportDisplayed = true; 
              console.log('Post marked as reported.', this.post.reported);
          },
          error: (error) => {
              console.error('Error marking post as reported:', error);
          },
      });
  }
  
  unreportPost(): void {
      this.ps.UnReportPost(this.postId).subscribe({
          next: () => {
              this.post.reported = false;
              this.unreportDisplayed = false; 
              console.log('Post unmarked as reported.', this.post.reported);
          },
          error: (error) => {
              console.error('Error unmarking post as reported:', error);
          },
      });
  }

  extractTagsFromPosts(posts: MyPosts[]): string[] {
    let tags: string[] = [];
    posts.forEach(post => {
      tags = tags.concat(post.tags);
    });
    tags = Array.from(new Set(tags));
    return tags;
  }

  loadPost(): void {
    if (this.postId) {
      this.ps.getPostById(this.postId).subscribe({
        next: (data) => {
          this.post = data;
          this.getTopThreePosts();
          this.loadComments();
        },
        error: (error) => {
          console.error('Error fetching post:', error);
        }
      });
    }
  }

  loadComments(): void {
    if (this.post && this.post.comments) {
      this.comments = this.post.comments;
      console.log(this.post.comments);
    } else {
      console.warn('No comments found for this post.');
    }
  }
 
  resetBoldState(): void {
    this.likeBold = false;
    this.loveBold = false;
    this.solutionBold = false;
    this.instructiveBold = false;
    this.dislikeBold = false;
  }

  likePost(): void {
    this.isLikeClicked = true; 
    setTimeout(() => {
      this.isLikeClicked = false; 
    }, 200); 

  
    this.ps.addPostAction(this.postId, 1, LikeAction.like).subscribe({
      next: (data) => {
        this.post = data;
        this.resetBoldState();
        this.likeBold = true;
        console.log('Post liked successfully:', data);
      },
      error: (error) => {
        console.error('Error liking post:', error);
      }
    });
    this.updateLikeStatus(LikeAction.like);

  }
  
  lovePost(): void {
    this.isLikeClicked = true; 
    setTimeout(() => {
      this.isLikeClicked = false; 
    }, 200);
    this.ps.addPostAction(this.postId, 1, LikeAction.love).subscribe({
      next: (data) => {
        this.post = data;
        this.resetBoldState();
        this.loveBold = true;
        console.log('Post liked successfully:', data);

      },
      error: (error) => {
        console.error('Error liking post:', error);
      }
    });
    this.updateLikeStatus(LikeAction.love);

  }

  solutionPost(): void {
    this.isLikeClicked = true; 
    setTimeout(() => {
      this.isLikeClicked = false; 
    }, 200); 
    this.ps.addPostAction(this.postId, 1, LikeAction.solution).subscribe({
      next: (data) => {
        this.post = data;
        this.resetBoldState();
        this.solutionBold = true;
        console.log('Post liked successfully:', data);

      },
      error: (error) => {
        console.error('Error liking post:', error);
      }
    });
    this.updateLikeStatus(LikeAction.solution);

  }

  instructivePost(): void {
    this.isLikeClicked = true; 
    setTimeout(() => {
      this.isLikeClicked = false; 
    }, 200); 
    this.ps.addPostAction(this.postId, 1, LikeAction.instructive).subscribe({
      next: (data) => {
        this.post = data;
        this.resetBoldState();
        this.instructiveBold = true;
        console.log('Post liked successfully:', data);

      },
      error: (error) => {
        console.error('Error liking post:', error);
      }
    });
    this.updateLikeStatus(LikeAction.instructive);

  }

  dislikePost(): void {
    this.isLikeClicked = true; 
    setTimeout(() => {
      this.isLikeClicked = false; 
    }, 200); 
    this.ps.addPostAction(this.postId, 1, LikeAction.dislike).subscribe({
      next: (data) => {
        this.post = data;
        this.resetBoldState();
        this.dislikeBold = true;

        console.log('Post disliked successfully:', data);

      },
      error: (error) => {
        console.error('Error liking post:', error);
      }
    });
    this.updateLikeStatus(LikeAction.dislike);


  }
  
  updateLikeStatus(action: LikeAction): void {
    this.ps.addPostAction(this.postId, 1, action).subscribe({
      next: (data) => {
        this.post = data;
        this.resetBoldState();
        switch (action) {
          case LikeAction.like:
            this.likeBold = true;
            break;
          case LikeAction.love:
            this.loveBold = true;
            break;
          case LikeAction.solution:
            this.solutionBold = true;
            break;
          case LikeAction.instructive:
            this.instructiveBold = true;
            break;
          case LikeAction.dislike:
            this.dislikeBold = true;
            break;
          default:
            break;
        }
        console.log('Post liked successfully:', data);
        this.updateLikesInLocalStorage(action);
      },
      error: (error) => {
        console.error('Error liking post:', error);
      }
    });
  }

  updateLikesInLocalStorage(action: LikeAction): void {
    const storedLikes = localStorage.getItem('userLikes');
    let userLikes = storedLikes ? JSON.parse(storedLikes) : {};
    userLikes[this.postId] = action;
    localStorage.setItem('userLikes', JSON.stringify(userLikes));
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

  onPopularPostClick(postId: number) {
    this.router.navigate(['/home-seconde', postId]); 
  }

}