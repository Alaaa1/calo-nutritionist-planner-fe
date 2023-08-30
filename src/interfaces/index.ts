// Ingredient Create/Update - Data
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

// Component
export interface IComponent{
  id: string,
  name: string;
  category?: string;
  description?: string;
  components_ingredients: Array<IComponentIngredient>
  unit: string;
  created_at: Date;
  updated_at: Date;
}

// Component Create/Update - Data
export interface IComponentData {
  id?: string
  name: string;
  category?: string;
  description?: string;
  ingredients?: Array<IComponentIngredientDataArray>
  unit: string;
}

// Component Ingredient
export interface IComponentIngredient{
  id: string,
  component_id: string,
  ingredient_id:string,
  ingredient_quantity:number,
  created_at: Date;
  updated_at: Date;
  ingredient: IIngredient
}

// ComponentIngredient Create/Update (Ingredient Array) - Data
export interface IComponentIngredientDataArray {
  ingredientId: string,
  ingredient_quantity: number
}

// Meal
export interface IMeal {
  id: string;
  name: string;
  description: string;
  size: string;
  unit: string;
  created_at: Date
  updated_at: Date
  meals_components: Array<IMealComponent>
}

// Meal Component
export interface IMealComponent {
  id: string;
  meal_id: string;
  component_id: string;
  component_quantity: string;
  created_at: Date;
  updated_at: Date;
  component: IComponent 
}

// Props --

// Add Ingredient Dialog/Modal
export interface IAddIngredientDialogProps {
  onIngredientAdded: (newIngredient: IIngredientData) => void;
}

// Add Ingredient Dialog/Modal
export interface IAddComponentDialogProps {
  onComponentAdded: (newComponent: IComponentData) => void;
}

// Zustand --

// Entity Store
export interface IEntityStore {
  entity: string,
  setEntity: (ent: string) => void;
  entityCount: number;
  setEntityCount: (count: number) => void;
  skip: number;
  setSkip: (amount: number) => void;
}

// Search Store
export interface ISearchStore {
  loading: boolean;
  setLoading: (load: boolean) => void;
  searchResult: any,
  setSearchResult: (result: any) => void
}

// Ingredient Store
export interface IIngredientStore {
  addOpen: boolean,
  setAddOpen: (isOpen: boolean) => void;
  selectedIngredient: IIngredient | null;
  setSelectedIngredient: (ingredient: IIngredient | null) => void;
}

// Component Store
export interface IComponentStore {
  addOpen: boolean,
  setAddOpen: (isOpen: boolean) => void;
  selectedComponent: IComponentData | null;
  setSelectedComponent: (component: IComponentData | null) => void;
}