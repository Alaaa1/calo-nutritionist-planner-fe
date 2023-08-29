// Ingredient Create - Data
export interface IIngredientData {
  id?: string;
  name: string;
  category?: string;
  description?: string;
  price: number;
  protein: number;
  fats: number;
  carbs: number;
  unit: string;
}

// Ingredient
export interface IIngredient {
  id: string;
  name: string;
  category: string | undefined;
  description: string | undefined;
  price: number;
  protein: number;
  fats: number;
  carbs: number;
  unit: string;
  created_at: Date;
  updated_at: Date;
}

// Ingredient Response
export interface IIngredientResponse {
  count: number;
  data: {
    id: string;
    name: string;
    category: string | undefined;
    description: string | undefined;
    price: number;
    protein: number;
    fats: number;
    carbs: number;
    unit: string;
    created_at: Date;
    updated_at: Date;
  };
}

export interface IAddIngredientDialogProps {
  onIngredientAdded: (newIngredient: IIngredientData) => void;
}

// Zustand --

// Ingredient Store
export interface IIngredientStore {
  addOpen: boolean,
  setAddOpen: (isOpen: boolean) => void;
  selectedIngredient: IIngredient | null;
  setSelectedIngredient: (ingredient: IIngredient | null) => void;
}

// Search Store
export interface ISearchStore {
  loading: boolean;
  setLoading: (load: boolean) => void;
  searchResult: IIngredient[] | null,
  setSearchResult: (result: any) => void
}

// Entity Store
export interface IEntityStore {
  entity: string,
  setEntity: (ent: string) => void;
  entityCount: number;
  setEntityCount: (count: number) => void;
  skip: number;
  setSkip: (amount: number) => void;
}