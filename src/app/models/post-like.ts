import { MyPosts } from "./my-posts";
import { User } from "./user";

export enum LikeAction {
    like = 'like',
    love = 'love',
    instructive = 'instructive',
    solution = 'solution',
    dislike = 'dislike'
  }

export class PostLike {
    id!: number;
    user!: User;
    post!: MyPosts;
    action!: LikeAction;
}
