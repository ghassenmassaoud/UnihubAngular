import { Classroom } from './Classroom';
import { ReplyTask } from './ReplyTask';
import { Role } from './Role';

export class User {
  id!: number;
  img!: string;
  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  role!: Role;
  token!: string;
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
}
