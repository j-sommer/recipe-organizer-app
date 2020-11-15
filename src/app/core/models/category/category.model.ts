import { Recipe } from '../recipe/recipe.model';
import { CategoryName } from './category-name.enum';

export interface Category {
  name: CategoryName;
  recipes: Recipe[];
  icon: string;
}
