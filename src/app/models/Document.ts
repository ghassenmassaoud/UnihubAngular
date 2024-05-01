import { Lesson } from "./Lesson";
import { Task } from "./Task";

export class Document {
    idDoc!: number;
    name!: string;
    url!: string;
    task!: Task;
    lesson!: Lesson;
  }
  