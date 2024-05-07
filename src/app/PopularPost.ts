import { Injectable } from '@angular/core';
import { MyPosts } from './models/my-posts';
import { sortBy } from 'lodash'; 


@Injectable({
  providedIn: 'root',
})
export class SortService {
    getTopThreeByLikes(posts: MyPosts[]): MyPosts[] {
        return sortBy(posts, 'likes').reverse().slice(0, 3); 
      }
}
