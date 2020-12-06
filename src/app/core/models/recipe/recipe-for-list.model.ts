import { Recipe } from './recipe.model';

export type RecipeForList = Recipe & { shouldShow: boolean };

export function createRecipeForList(recipe: Recipe): RecipeForList {
  return Object.assign({ shouldShow: true }, recipe) as RecipeForList;
}
