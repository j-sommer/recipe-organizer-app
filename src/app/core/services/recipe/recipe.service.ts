import { Injectable } from '@angular/core';
import { Category } from '@core/models/category/category.model';

import { CategoryService } from '../category/category.service';
import { RecipeFileHandlerService } from '../recipe-file-handler/recipe-file-handler.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private recipeFileHander: RecipeFileHandlerService) {}

  public async onCategoryRemoval(removedCategory: Category): Promise<void> {
    const recipes = await this.recipeFileHander.readRecipes();

    const filteredRecipes = recipes.filter(
      (recipe) => recipe.categoryId === removedCategory.id
    );

    filteredRecipes.forEach((recipe) => {
      recipe.categoryId = CategoryService.defaultCategoryId;
      this.recipeFileHander.saveRecipe(recipe);
    });
  }
}
