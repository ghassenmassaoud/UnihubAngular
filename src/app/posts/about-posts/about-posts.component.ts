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
import { CommentsService } from 'app/comments.service';
import { Comment } from 'app/models/comment';
import { MyPosts } from 'app/models/my-posts';
import { LikeAction } from 'app/models/post-like';
import { PostsService } from 'app/posts.service';
import { StateService } from 'app/state.service';
import { NgScrollbarModule } from 'ngx-scrollbar';

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
    NgScrollbarModule,
    MatButtonModule,MatIconModule
  ],
  templateUrl: './about-posts.component.html',
  styleUrl: './about-posts.component.scss',
  providers: [PostsService]
})
export class AboutPostsComponent {
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





  constructor(private route: ActivatedRoute, private stateService: StateService, private cs: CommentsService,private router: Router, private ps: PostsService, private sortService: SortService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = Number(params.get('postId'));
      this.loadPost();
    });
    this.loadAllPosts();
    this.ps.getPosts().subscribe(posts => {
      this.allTags = this.extractTagsFromPosts(posts);
      this.loadLikeStatus();

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


navigateToComments() {
  this.cs.getCommentsForPost(this.postId).subscribe(comments => {
    this.router.navigate(['/admin/contact', { postId: this.postId, comments: comments }]);
  });
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
      },

    });
    this.updateLikeStatus(LikeAction.like);


  }
  onPopularPostClick(postId: number) {
    this.router.navigate(['/home-seconde', postId]);
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


