import { CommentLike } from "./comment-like";
import { MyPosts } from "./my-posts";

export class Comment {
    commentId!: number;
    repliesCount!: number;
    replies: Comment[] = [];
    parentComment: Comment | null = null;
    content!: string;
    commentDate!: string; // Si commentDate est de type LocalDate en Java, vous devrez le convertir en string en TypeScript
    likes!: number;
    commentLikes: CommentLike[] = [];
    post!: MyPosts;
    report!: boolean;
   // attachment: AttachComment[] = [];
}
