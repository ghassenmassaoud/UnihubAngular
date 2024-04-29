import { Absence } from "./Absence";
import { User } from "./User";

export class Classroom {
    idClassroom!: number;
    classroomName!: string;
    teacher!: User;
    absences!: Absence[];
    students!: User[];
  }
  