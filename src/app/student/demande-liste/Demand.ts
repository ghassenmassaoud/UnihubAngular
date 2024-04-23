import { demandtype } from "./DemandType";

export class Demand {
  demandId!: number ;
  description!:String ;
  DemandType!: demandtype;
  status: string;
  CreationDate!:Date;

    
    constructor(demande: Demand) {
      {
        this.demandId = demande.demandId || this.getRandomID();
        this.description = demande.description || '';
        this.DemandType = demande.DemandType || '';
        this.status = demande.status || '';
        this.CreationDate = demande.CreationDate || '';
        
      }
    }
    public getRandomID(): number {
      const S4 = () => {
        return ((1 + Math.random()) * 0x10000) | 0;
      };
      return S4() + S4();
    }
  }
  