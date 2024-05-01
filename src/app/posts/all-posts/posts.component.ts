import { Component } from '@angular/core';
import { PostsService } from 'app/posts.service';
import { Router } from '@angular/router';

import { OnInit } from '@angular/core';
import { MyPosts } from 'app/models/my-posts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { LikeAction } from 'app/models/post-like';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    FileUploadComponent,
    MatButtonModule,MatIconModule
  ],
  providers: [PostsService]
})
export class PostsComponent implements OnInit {
  
  title= 'posts-app';
  posts!: MyPosts[];
  postId!: number  | undefined;
  showTagsAndAttachments: boolean = false; 
  filteredPosts: MyPosts[] = [];
  searchInput: string = '';// Variable pour contrôler l'affichage des tags et des pièces jointes
  maxLengthToShow = 200; 


  
  constructor(private ps: PostsService, private router: Router){

  }



  ngOnInit() {
    console.log('On init ..')
    this.ps.getPosts().subscribe(
      data => {this.posts = data}
    )
  }
 
  toggleDetails(postId: number) {
    const post = this.posts.find(post => post.postId === postId);
    if (post) {
 
        this.router.navigate(['./blog-details', postId]);
     

    } else {
      console.error('Post not found with ID:', postId);
    }

  }

  
  editDetails(postId: number) {
    const post = this.posts.find(post => post.postId === postId);
    if (post) {
      this.router.navigate(['./about', postId]);
    } else {
      console.error('Post not found with ID:', postId);
    }

  }
  navigateToBlog() {
    this.router.navigate(['/profile']);
  }
  
  onSubmit(): void {
    this.ps.filterPostsByTags(this.searchInput).subscribe({
      next: (data) => {
        this.filteredPosts = data;
      },
      error: (error) => {
        console.error('Error filtering posts:', error);
      }
    });
  }

  filterPosts() {
    this.filteredPosts = this.posts.filter(post =>
      post.tags.some(tag => tag.toLowerCase().includes(this.searchInput.toLowerCase()))
    );
  }

  fetchPosts(): void {
    this.ps.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }
  deletePost(postId: number): void {
    this.ps.deletePost(postId).subscribe({
      next: (response) => {
        console.log('Post deleted successfully:', response);
        // Mettez à jour la liste des posts après la suppression
        this.fetchPosts(); // Par exemple, une méthode pour recharger les posts après suppression
      },
      error: (error) => {
        console.error('Error deleting post:', error);
        // Gérez l'erreur de suppression de post ici
      }
    });

  }
  getTotalPostCount(posts: MyPosts[]): number {
    if (posts && Array.isArray(posts)) {
      return posts.length;
    } else {
      return 0; // ou une valeur par défaut appropriée
    }
  }
  
  getTotalLikesCount(posts: MyPosts[]): number {
    if (posts && Array.isArray(posts)) {
      let totalLikes = 0;
      posts.forEach(post => {
        totalLikes += post.likes;
      });
      return totalLikes;
    } else {
      return 0; // ou une valeur par défaut appropriée
    }
  }
  getTotalViewsCount(posts: MyPosts[]): number {
    if (posts && Array.isArray(posts)) {
      let totalViews = 0;
      posts.forEach(post => {
        if (post && typeof post.views === 'number') {
          totalViews += post.views;
        }
      });
      return totalViews;
    } else {
      return 0; // ou une valeur par défaut appropriée
    }
  }
  
  getAverageLikesPerPost(posts: MyPosts[]): number {
    const totalLikes = this.getTotalLikesCount(posts);
    const totalPosts = this.getTotalPostCount(posts);
    return totalPosts > 0 ? totalLikes / totalPosts : 0;
  }
  getReportedPostsPercentage(posts: MyPosts[]): number {
    if (!posts || !Array.isArray(posts)) {
      return 0; // Retourne 0 si posts est undefined, null ou n'est pas un tableau
    }
  
    const reportedPosts = posts.filter(post => post && post.report);
    const totalPosts = this.getTotalPostCount(posts);
    const percentage = totalPosts > 0 ? (reportedPosts.length / totalPosts) * 100 : 0;
    return parseFloat(percentage.toFixed(1)); // Formater le pourcentage avec une décimale
  }
  
 
  getEmojiCount(posts: MyPosts[], emoji: string): number {
    if (!posts || !Array.isArray(posts)) {
      return 0; // Retourne 0 si posts est undefined, null ou n'est pas un tableau
    }
  
    let count = 0;
    posts.forEach(post => {
      if (post && post.emoji === emoji) {
        count++;
      }
    });
    return count;
  }
}  