export enum CategoryName {
  Meat = 'meat',
  Fish = 'fish',
  Baking = 'baking',
  Dessert = 'dessert',
  Snacks = 'snacks',
  Other = 'other',
}

export function getCategories(): string[] {
  return Object.keys(CategoryName).map((key) => CategoryName[key]);
}
