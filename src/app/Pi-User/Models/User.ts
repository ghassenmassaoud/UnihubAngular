import { Role } from "./Role";

export class User {
  idUser!: number;
    img!: string;
    email!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
    roles!: Role[];
    token!: string;
    speciality!: string;
    number!:number;


  }