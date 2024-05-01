import { Lesson } from "./Lesson";
import { Document } from "./Document";


export class Task{
    idTask!: number;
    taskDescription!: string;
    deadline!: Date;
    mark!: number;
    taskState!: string;
    lesson!: Lesson[];
    documents!: Document[]; 

}