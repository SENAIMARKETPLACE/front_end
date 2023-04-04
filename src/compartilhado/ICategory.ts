import { ISubcategory } from "./ISubcategory";

export interface ICategory {
    id: string
    value: string;
    label: string;
    subcategories: { label: string; value: string }[];
}

