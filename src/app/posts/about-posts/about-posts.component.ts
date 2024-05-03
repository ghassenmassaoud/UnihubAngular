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

  constructor(private route: ActivatedRoute, private router: Router, private ps: PostsService, private sortService: SortService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = Number(params.get('postId'));
      this.loadPost();
    });
    this.loadAllPosts();
    this.ps.getPosts().subscribe(posts => {
      this.allTags = this.extractTagsFromPosts(posts);
    });
  }

  reportPost(): void {
    this.ps.ReportPost(this.postId).subscribe({
      next: () => {
        this.isReported = true;
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
    //  this.noComments = false;
      console.log(this.post.comments);
    } else {
      console.warn('No comments found for this post.');
   //   this.noComments = true;
    }
  }
 

  likePost(): void {
    this.ps.addPostAction(this.postId, 1, LikeAction.like).subscribe({
      next: (data) => {
        this.post = data;
      },
      error: (error) => {
        console.error('Error liking post:', error);
      }
    });
  }

  lovePost(): void {
    this.ps.addPostAction(this.postId, 1, LikeAction.love).subscribe({
      next: (data) => {
        this.post = data;
      },
      error: (error) => {
        console.error('Error liking post:', error);
      }
    });
  }

  solutionPost(): void {
    this.ps.addPostAction(this.postId, 1, LikeAction.solution).subscribe({
      next: (data) => {
        this.post = data;
      },
      error: (error) => {
        console.error('Error liking post:', error);
      }
    });
  }

  instructivePost(): void {
    this.ps.addPostAction(this.postId, 1, LikeAction.instructive).subscribe({
      next: (data) => {
        this.post = data;
      },
      error: (error) => {
        console.error('Error liking post:', error);
      }
    });
  }

  dislikePost(): void {
    this.ps.addPostAction(this.postId, 1, LikeAction.dislike).subscribe({
      next: (data) => {
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


