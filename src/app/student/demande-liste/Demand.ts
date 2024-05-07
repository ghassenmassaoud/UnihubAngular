import { demandType } from "./DemandType";

export class Demand {
  
  demandId!: number;
  description!: string;
  demandType!: demandType;
  status: boolean | undefined;
  creationDate: Date | undefined;

  // constructor(demand: Demand) {
  //   this.demandId = demand.demandId ;
  //   this.description = demand.description || '';
  //   this.demandType = demand.demandType || '';
  //   this.status = demand.status || false;
  //   this.creationDate = demand.creationDate || new Date();
  // }

  // public getRandomID(): number {
  //   const S4 = () => {
  //     return ((1 + Math.random()) * 0x10000) | 0;
  //   };
  //   return S4() + S4();
  // }
}