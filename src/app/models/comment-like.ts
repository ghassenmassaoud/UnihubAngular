import { Comment } from "./comment";
import { User } from "./user";

export enum LikeAction {
    like = 'like',
    love = 'love',
    instructive = 'instructive',
    solution = 'solution',
    dislike = 'dislike'
  }

export class CommentLike {
    id!: number;
    user!: User;
    comment!: Comment;
    action!: LikeAction;
}
