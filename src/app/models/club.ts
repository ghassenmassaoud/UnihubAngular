import { Profile } from "app/models/profile";

export class Club {
    idClub!: number;
    clubName!: string;
    clubType!: ClubType;
    profile!: Profile[];
    events!: Event[];
  }

  export enum ClubType {
    ROBOTIC,THEATER,MUSIC
  }
