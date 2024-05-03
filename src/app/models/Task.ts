import { Lesson } from "./Lesson";
import { Document } from "./Document";


export class Task{
    idTask!: number;
    taskDescription!: string;
    deadline!: string;
    mark!: number;
    taskState!: string;
    lesson!: Lesson[];
    documents!: Document[]; 

}