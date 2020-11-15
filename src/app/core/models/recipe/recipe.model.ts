import { CategoryName } from '../category/category-name.enum';
import { Ingredient } from './ingredient.model';

export interface Recipe {
  title: string;
  category: CategoryName;
  img?: string;
  tags: string[];
  ingredients: Ingredient[];
  preparation: string;
}
