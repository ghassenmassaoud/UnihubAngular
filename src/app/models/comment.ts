import { CommentLike } from "./comment-like";
import { MyPosts } from "./my-posts";

export class Comment {
    commentId!: number;
    repliesCount!: number;
    replies: Comment[] = [];
    parentComment: Comment | null = null;
    content!: string;
    commentDate!: string; 
    likes!: number;
    commentLikes: CommentLike[] = [];
    post!: MyPosts;
    report!: boolean;
}
