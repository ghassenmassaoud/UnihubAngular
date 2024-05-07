import { Classroom } from "./Classroom";
import { User } from "./User";

export class Absence {
    idAbsence!: number;
    statusAbsence!: string;
    dateAbsence!: Date;
    classroom!: Classroom;
    studentId!: User; 
    //profile: Profile;
    //user!: User;
  }