import { Component } from '@angular/core';
import { categoriesList } from '@core/const/categories-list.const';
import { Category } from '@core/models/category/category.model';
import { Recipe } from '@core/models/recipe/recipe.model';
import { RecipeFileHandlerService } from '@core/services/recipe-file-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public categories = categoriesList;

  public hasRecipes = false;
  public isLoading = true;

  constructor(private recipeFileHandler: RecipeFileHandlerService) {}

  public async ionViewWillEnter(): Promise<void> {
    await this.recipeFileHandler.createRecipeDir();
    this.clearCategories();

    const recipes = await this.recipeFileHandler.readRecipes();
    this.hasRecipes = recipes && !!recipes.length;

    if (this.hasRecipes) {
      this.fillCategories(recipes);
      this.isLoading = false;
    }
  }

  private fillCategories(recipes: Recipe[]): void {
    recipes.forEach((recipe: Recipe) => {
      const matchingCategory = this.categories.find(
        (category) => category.name === recipe.category
      );

      matchingCategory.recipes.push(recipe);
    });
  }

  private clearCategories(): void {
    this.categories.forEach((category: Category) => {
      category.recipes.length = 0;
    });
  }
}
