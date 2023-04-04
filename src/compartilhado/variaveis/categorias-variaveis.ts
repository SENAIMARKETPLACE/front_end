import { ICategory } from "../ICategory";

// LISTA DE CATEGORIAS
export const categories: ICategory[] = [
    {
        id: "1", 
        value: "Calçados",
        label: "Calçados",
        subcategories: [
            {
                value: "Casual",
                label: "Casual",
            },
            {
                value: "Corrida",
                label: "Corrida",
            },
            {
                value: "Treino",
                label: "Treino",
            },
            {
                value: "Chuteiras",
                label: "Chuteiras"
            },
            {
                value: "Skateboarding",
                label: "SkateBoarding"
            }
        ]
    },
    {
        id: "2", 
        value: "Roupas",
        label: "Roupas",
        subcategories: [
            {
                value: "Bermudas",
                label: "Bermudas",
            },
            {
                value: "Casacos",
                label: "Casacos",
            },
            {
                value: "Calças",
                label: "Calças",
            },
            {
                value: "Camisas",
                label: "Camisas"
            },
            {
                value: "Camisetas",
                label: "Camisetas"
            }
        ]
    },
    {
        id: "3", 
        value: "Suplementos",
        label: "Suplementos",
        subcategories: [
            {
                value: "Proteínas",
                label: "Proteínas",
            },
            {
                value: "Aminoácidos",
                label: "Aminoácidos",
            },
            {
                value: "Carboidratos",
                label: "Carboidratos",
            },
            {
                value: "Termogênicos",
                label: "Termogênicos"
            },
            {
                value: "Vitaminas",
                label: "Vitaminas"
            }
        ]
    },
    {
        id: "4", 
        value: "Esportes",
        label: "Esportes",
        subcategories: [
            {
                value: "Corridas",
                label: "Corridas",
            },
            {
                value: "Futebol",
                label: "Futebol",
            },
            {
                value: "Training",
                label: "Training",
            },
            {
                value: "Tênis",
                label: "Tênis"
            },
            {
                value: "Natação",
                label: "Natação"
            },
            {
                value: "Musculação",
                label: "Musculação"
            },
            {
                value: "Yoga",
                label: "Yoga"
            },
            {
                value: "Basquete",
                label: "Basquete" 
            }, 
            {
                value: "Outros", 
                label: "Outros"
            }

        ]
    }, 
    {
        id: "4", 
        value: "Acessórios",
        label: "Acessórios",
        subcategories: [
            {
                value: "Bonés & Viseiras",
                label: "Bonés & Viseiras",
            },
            {
                value: "Bolsas e Mochilas",
                label: "Bolsas e Mochilas",
            },
            {
                value: "Bolas",
                label: "Bolas",
            },
            {
                value: "Meias",
                label: "Meias"
            },
            {
                value: "Roupas Íntimas",
                label: "Roupas Íntimas"
            },
            {
                value: "Luvas",
                label: "Luvas"
            }
        ]
    }
]