import { ComplaintType } from "./ComplaintType";

export class Complaint{
    complaintId! : number ;
    description! : String ;
    complaintType! : ComplaintType ;
    title!: String ;
    status! : boolean  | undefined;
}