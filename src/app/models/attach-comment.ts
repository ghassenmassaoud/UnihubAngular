import { Comment } from "./comment";

export class AttachComment {
    attach_id!: number;
    name!:String;
    url!:String; 
  
    comment: Comment | null = null;
}
