import { Club } from "app/models/club";
import { User } from "../Pi-User/Models/User";

export class ProfileId {
    club!: Club;
    student!: User;
  }

export enum ProfileRole {
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER'
  }

export enum State {
    ACTIVE = 'ACTIVE',
    BANNED = 'BANNED'
  }
export class Profile {
    pid!: ProfileId; // Vous devez définir la propriété comme pid, pas pId
    profileRole!: ProfileRole; // Assurez-vous que le nom est correct et utilisez ProfileRole au lieu de string
    profileState!: State; // Assurez-vous que le nom est correct et utilisez State au lieu de string
    mark!: number;
}







