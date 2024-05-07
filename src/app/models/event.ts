export class Event {

    idEvent!: number;
    eventName!: string;
    eventDate!: string;
    decription!: string;
    access!: Access;
  }
  export enum Access {
      PUBLIC = 'PUBLIC',
      PRIVATE = 'INTERN'
    }