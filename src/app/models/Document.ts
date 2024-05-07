import { Lesson } from "./Lesson";
import { ReplyTask } from "./ReplyTask";
import { Task } from "./Task";

export class Document {
    idDoc!: number;
    name!: string;
    url!: string;
    task!: Task[];
    lesson!: Lesson[];
    replyTask!:ReplyTask[];
  }
  