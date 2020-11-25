import { RecipeForList } from '../recipe/recipe-for-list.model';
import { CategoryName } from './category-name.enum';

export interface Category {
  name: CategoryName;
  recipes: RecipeForList[];
  icon: string;
}
