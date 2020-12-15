import { Component } from '@angular/core';
import { CategoryForList } from '@core/models/category/category-for-list.model';
import { Category } from '@core/models/category/category.model';
import { RecipeForList } from '@core/models/recipe/recipe-for-list.model';
import { Recipe } from '@core/models/recipe/recipe.model';
import { CategoryService } from '@core/services/category/category.service';
import { RecipeFileHandlerService } from '@core/services/recipe-file-handler/recipe-file-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public readonly categoryViewBaseRoute = '/category-view';
  public categoriesForList: CategoryForList[] = [];

  public hasContent = false;
  public isLoading = true;

  constructor(
    private recipeFileHandler: RecipeFileHandlerService,
    private categoryService: CategoryService
  ) {}

  public async ionViewWillEnter(): Promise<void> {
    await this.recipeFileHandler.createRecipeDir();
    const categories = await this.loadCategories();

    if (categories?.length) {
      const recipes = await this.recipeFileHandler.readRecipes();

      if (recipes && !!recipes.length) {
        this.fillCategories(recipes);
        this.hasContent = true;
      }
    }

    this.isLoading = false;
  }

  public onSearchChange(event): void {
    const query = event.target.value.toLowerCase();

    this.categoriesForList.forEach((category) => {
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
      this.categoriesForList.forEach((category) => {
        category.recipes.forEach((recipe) => {
          recipe.shouldShow = true;
        });
      });
    }
  }

  public shouldShowCategory(category: CategoryForList): boolean {
    return category.recipes.some((recipe) => recipe.shouldShow);
  }

  private async loadCategories(): Promise<Category[]> {
    const loadedCategories: Category[] = await this.categoryService.getCategoriesInstant();

    loadedCategories.forEach((category: Category) =>
      this.categoriesForList.push({ category, recipes: [] })
    );

    return Promise.resolve(loadedCategories);
  }

  private fillCategories(recipes: Recipe[]): void {
    recipes.forEach((recipe: RecipeForList) => {
      const matchingCategory = this.categoriesForList.find(
        (forList) => forList.category.id === recipe.categoryId
      );

      recipe.shouldShow = true;
      matchingCategory.recipes.push(recipe);
    });
  }
}
