import { CategoryName } from '@core/models/category/category-name.enum';
import { Category } from '@core/models/category/category.model';

export const categoriesList: Category[] = [
  { name: CategoryName.Meat, recipes: [] },
  { name: CategoryName.Baking, recipes: [] },
  { name: CategoryName.Dessert, recipes: [] },
  { name: CategoryName.Fish, recipes: [] },
  { name: CategoryName.Snacks, recipes: [] },
  { name: CategoryName.Other, recipes: [] },
];
