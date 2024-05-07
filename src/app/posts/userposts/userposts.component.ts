import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { SortService } from 'app/PopularPost';
import { MyPosts } from 'app/models/my-posts';
import { PostsService } from 'app/posts.service';
import { RecommService } from 'app/recomm.service';

@Component({
  selector: 'app-userposts',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,MatIconModule],
  templateUrl: './userposts.component.html',
  styleUrls: ['./userposts.component.scss'],
  providers: [PostsService]

})
export class UserpostsComponent {
  postId!: number  | undefined;
  post: any;
  userId=1;
  posts: MyPosts[] = [];
  comments: Comment[] = [];
  topThreePosts: MyPosts[] = [];
  allPosts: MyPosts[] = [];
  allTags: string[] = [];
  maxLengthToShow = 200;
  recommendations: MyPosts[] = [];

  constructor(private route: ActivatedRoute,private router: Router, private rc:RecommService,private ps: PostsService, private sortService: SortService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = Number(params.get('postId'));
      this.loadPost();
    });
    this.loadAllPosts();
    this.ps.getPosts().subscribe(posts => {
      this.allTags = this.extractTagsFromPosts(posts);
      this.Recomm();


    });
  }
  Recomm(): void {
    this.rc.getRecomm(this.userId).subscribe({
      next: (data: MyPosts[]) => {
        console.log('Données de recommandation reçues :', data);
        this.recommendations = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des recommandations :', error);
      }
    });

  }
  onPopularPostClick(postId: number) {
    this.router.navigate(['/main/post', postId]);
  }
  navigateToShare() {
    this.router.navigate(['/main/share']);
  }
  toggleDetails(postId: number) {
    if (this.posts && this.posts.length > 0) {
      const post = this.posts.find(post => post.postId === postId);
      if (post) {
        this.router.navigate(['/main/post', postId]);
      } else {
        console.error('Post not found with ID:', postId);
      }
    } else {
      console.error('Posts array is empty or not initialized.');
    }
  }
  loadPost(): void {
    if (this.postId) {
      this.ps.getPostById(this.postId).subscribe({
        next: (data) => {
          this.post = data;
          this.getTopThreePosts();
        },
        error: (error) => {
          console.error('Error fetching post:', error);
        }
      });
    }
  }

  loadAllPosts(): void {
    this.ps.getPosts().subscribe({
      next: (data) => {
        this.allPosts = data;
        this.posts = data;
        this.getTopThreePosts();
        this.extractTagsFromPosts(data);
      },
      error: (error) => {
        console.error('Error fetching all posts:', error);
      }
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

  getTopThreePosts(): void {
    this.topThreePosts = this.sortService.getTopThreeByLikes(this.allPosts);
  }
}
