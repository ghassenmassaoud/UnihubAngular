import { Absence } from "./Absence";
import { User } from "../Pi-User/Models/User";

export class Classroom {
    idClassroom!: number;
    classroomName!: string;
    teacher!: User;
    absences!: Absence[];
    students!: User[];
  }
