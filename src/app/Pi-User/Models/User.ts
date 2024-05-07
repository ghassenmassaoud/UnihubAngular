import { MyPosts } from "app/models/my-posts";
import { Role } from "./Role";
import { PostLike } from "app/models/post-like";

export class User {
  idUser!: number;
    img!: string;
    email!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
    roles!: Role[];
    token!: string;
    speciality!: string;
    number!:number;
    posts: MyPosts[] = [];
    comments: Comment[] = [];
    postLikes: PostLike[] = [];

  }