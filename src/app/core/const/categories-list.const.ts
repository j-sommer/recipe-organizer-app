import { CategoryName } from '@core/models/category/category-name.enum';
import { Category } from '@core/models/category/category.model';

export const categoriesList: Category[] = [
  { name: CategoryName.Meat, recipes: [], icon: 'flame' },
  { name: CategoryName.Baking, recipes: [], icon: 'cafe' },
  { name: CategoryName.Dessert, recipes: [], icon: 'ice-cream' },
  { name: CategoryName.Fish, recipes: [], icon: 'fish' },
  { name: CategoryName.Snacks, recipes: [], icon: 'pizza' },
  { name: CategoryName.Other, recipes: [], icon: 'restaurant' },
];
