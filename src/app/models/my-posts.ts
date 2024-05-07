import { PostLike } from "./post-like";
import { User } from "./user";
export enum Status {
    published = 'published',
    pending = 'pending',
    draft = 'draft',
    trach = 'trach',
  }
export class MyPosts {
    postId!: number;
    title!: string;
    content!: string;
    tags!: string[];
    datePost!: string; 
    likes!: number;
    views!: number;
    status?: string; 
    student!: User; 
    comments!: Comment[]; 
    report!: boolean;
    postLikes!: PostLike[]; 
    sentimentScore!: number;
    emoji!: string;
}
