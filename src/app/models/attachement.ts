import { MyPosts } from "./my-posts";

export class Attachement {
idAttachment!: number;
name!:String;
    url!:String; 
  post: MyPosts | null = null;
}
