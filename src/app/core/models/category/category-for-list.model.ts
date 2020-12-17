import { RecipeForList } from '../recipe/recipe-for-list.model';
import { Category } from './category.model';

export interface CategoryForList {
  category: Category;
  recipes: RecipeForList[];
}
