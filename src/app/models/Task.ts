import { Lesson } from "./Lesson";

export class Task{
    idTask!: number;
    taskDescription!: string;
    deadline!: Date;
    mark!: number;
    taskState!: string;
    lesson!: Lesson[];
}