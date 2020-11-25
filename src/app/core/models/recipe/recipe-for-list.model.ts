import { Recipe } from './recipe.model';

export type RecipeForList = Recipe & { shouldShow: boolean };
