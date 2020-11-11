import { Ingredient } from './ingredient.model';

export interface Recipe {
  title: string;
  category: string;
  img?: string;
  tags: string[];
  ingredients: Ingredient[];
  preparation: string;
}
