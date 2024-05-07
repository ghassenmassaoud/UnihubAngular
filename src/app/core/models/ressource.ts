import { RessourceSpace } from "./RessourceSpace";
import { RessourceType } from "./RessourceType";

export class ressource  {
    ressourceId!: number;
    ressourceName!: string;
    fileData!: File;
    ressourceType!: RessourceType;
    ressourceSpace!: RessourceSpace;
    fileName!:string;
    description !:string

}