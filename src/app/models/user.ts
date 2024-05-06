import { MyPosts } from "./my-posts";
import { PostLike } from "./post-like";

export class User {
    idUser!: number;
  firstName!: string;
  lastName!: string;
  birthDate!: string; 
  email!: string;
  number!: number;
  password!: string;
  firstAuth!: boolean;
  code!: number;
  posts: MyPosts[] = [];
  comments: Comment[] = [];
  postLikes: PostLike[] = [];
//  subscriptions: Subscription[] = [];
}
