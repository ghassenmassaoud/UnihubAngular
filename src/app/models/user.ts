import { Absence } from "./Absence";
import { Classroom } from "./Classroom";
import { ReplyTask } from "./ReplyTask";
import { Role } from "./Role";

export class User{
        idUser!: number;
        firstName!: string;
        lastName!: string;
        birthDate!: Date;
        email!: string;
        number!: number;
        password!: string;
        firstAuth!: boolean;
        code!: number;
        absences!: Absence[];
        roles!: Role[];
        //state!: State;
        //profiles!: Profile[];
        speciality!: string;
        classrooms!: Classroom[];
        // events!: Event[];
        // posts!: Post[];
        // comments!: Comment[];
        // complaints!: Complaint[];
        //demands!: Demand[];
        //ressourceSpaces!: RessourceSpace[];
        classroomStudent!: Classroom[];
        replyTask!: ReplyTask[];
        events!: Event[];
      }
