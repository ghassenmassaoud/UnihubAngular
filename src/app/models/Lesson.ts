import { Classroom } from "./Classroom";
import { Task } from "./Task";

export class Lesson{

        idLesson!: number;
        lessonName!: string;
        visibility!: string;
        classroom!: Classroom;
        tasks!: Task[];
      }

