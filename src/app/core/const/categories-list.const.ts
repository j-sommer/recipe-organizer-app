import { CategoryName } from '@core/models/category/category-name.enum';
import { Category } from '@core/models/category/category.model';

export const categoriesList: Category[] = [
  { name: CategoryName.Meat, recipes: [], icon: 'flame-outline' },
  { name: CategoryName.Baking, recipes: [], icon: 'cafe-outline' },
  { name: CategoryName.Dessert, recipes: [], icon: 'ice-cream-outline' },
  { name: CategoryName.Fish, recipes: [], icon: 'fish-outline' },
  { name: CategoryName.Snacks, recipes: [], icon: 'pizza-outline' },
  { name: CategoryName.Other, recipes: [], icon: 'restaurant-outline' },
];
