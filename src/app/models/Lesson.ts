import { Classroom } from "./Classroom";
import { Task } from "./Task";
import { Document } from "./Document";

export class Lesson{

        idLesson!: number;
        lessonName!: string;
        visibility!: string;
        classroom!: Classroom;
        tasks!: Task[];
        documents!: Document[];

      }

