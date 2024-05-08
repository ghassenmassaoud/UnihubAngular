import { MyPosts } from "app/models/my-posts";
import { Role } from "./Role";
import { PostLike } from "app/models/post-like";
import { Classroom } from "app/models/Classroom";
import { ReplyTask } from "app/models/ReplyTask";

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

        classrooms!: Classroom[];
        // events!: Event[];
        // posts!: Post[];
        // comments!: Comment[];
        // complaints!: Complaint[];
        //demands!: Demand[];
        //ressourceSpaces!: RessourceSpace[];
        classroomStudent!: Classroom[];
        replyTask!: ReplyTask[];
        events!: Event[];

  }