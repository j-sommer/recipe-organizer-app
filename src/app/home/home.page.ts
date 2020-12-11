import { Component } from '@angular/core';
import { categoriesList } from '@core/const/categories-list.const';
import { Category } from '@core/models/category/category.model';
import { RecipeForList } from '@core/models/recipe/recipe-for-list.model';
import { Recipe } from '@core/models/recipe/recipe.model';
import { RecipeFileHandlerService } from '@core/services/recipe-file-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public readonly categoryViewBaseRoute = '/category-view';
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
    }

    this.isLoading = false;
  }

  public onSearchChange(event): void {
    const query = event.target.value.toLowerCase();

    this.categories.forEach((category) => {
      category.recipes.forEach((recipe) => {
        if (!query) {
          recipe.shouldShow = true;
          return;
        }

        const shouldShow = recipe.title.toLowerCase().indexOf(query) > -1;
        recipe.shouldShow = shouldShow;
      });
    });
  }

  public onSearchStart(isSearching: boolean): void {
    if (!isSearching) {
      this.categories.forEach((category) => {
        category.recipes.forEach((recipe) => {
          recipe.shouldShow = true;
        });
      });
    }
  }

  public showCategory(category: Category): boolean {
    return category.recipes.some((recipe) => recipe.shouldShow);
  }

  private fillCategories(recipes: Recipe[]): void {
    recipes.forEach((recipe: RecipeForList) => {
      const matchingCategory = this.categories.find(
        (category) => category.name === recipe.category
      );

      recipe.shouldShow = true;
      matchingCategory.recipes.push(recipe);
    });
  }

  private clearCategories(): void {
    this.categories.forEach((category: Category) => {
      category.recipes.length = 0;
    });
  }
}
