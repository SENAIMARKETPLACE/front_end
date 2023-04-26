import { ISubcategory } from "./ISubcategory";

export interface ICategory {
    id?: string
    nome: string;
    sub_categoria: ISubcategory; 
}

