import { CategoryName } from '../category/category-name.enum';
import { IngredientGroup } from './ingredient/ingredient-group.model';

export interface Recipe {
  title: string;
  category: CategoryName;
  img?: string;
  tags: string[];
  ingredientsGroups: IngredientGroup[];
  preparation: string;
  filePath?: string;
}
