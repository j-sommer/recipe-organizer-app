import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@core/models/category/category.model';
import {
  createRecipeForList,
  RecipeForList,
} from '@core/models/recipe/recipe-for-list.model';
import { Recipe } from '@core/models/recipe/recipe.model';
import { CategoryService } from '@core/services/category/category.service';
import { RecipeFileHandlerService } from '@core/services/recipe-file-handler/recipe-file-handler.service';
import { imageBase64Prefix } from '@core/util/image-base64-prefix.const';
import { Subscription } from 'rxjs';

import { destinations } from '../app-routing.module';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.page.html',
  styleUrls: ['./category-view.page.scss'],
})
export class CategoryViewPage implements OnDestroy {
  public readonly imagePrefix = imageBase64Prefix;

  public category: Category;
  public categoryRecipes: RecipeForList[] = [];

  public hasRecipes = false;
  public isLoading = true;

  private subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeFileHandler: RecipeFileHandlerService,
    private categoryService: CategoryService
  ) {}

  public async ionViewWillEnter(): Promise<void> {
    this.extractCategoryFromRoute();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onRecipeClick(recipe: Recipe): void {
    this.router.navigate([destinations.recipeView], {
      state: { data: recipe },
    });
  }

  public onSearchChange(event): void {
    const query = event.target.value.toLowerCase();

    this.categoryRecipes.forEach((item) => {
      if (!query) {
        item.shouldShow = true;
        return;
      }

      const shouldShow = item.title.toLowerCase().indexOf(query) > -1;
      item.shouldShow = shouldShow;
    });
  }

  public onStartSearch(isSearching: boolean): void {
    if (!isSearching) {
      this.categoryRecipes.forEach((item) => (item.shouldShow = true));
    }
  }

  private extractCategoryFromRoute(): void {
    this.subscription = this.route.queryParams.subscribe((params) => {
      const categoryId = +params.categoryid;

      if (!categoryId == null || typeof categoryId !== 'number') {
        this.router.navigate([destinations.home]);
      }

      const requestedCategory: Category = this.categoryService
        .getCategoriesInstant()
        .find((category) => category.id === categoryId);

      if (!requestedCategory) {
        this.router.navigate([destinations.home]);
      }

      this.category = requestedCategory;

      this.loadRecipes(categoryId);
    });
  }

  private async loadRecipes(categoryId: number): Promise<void> {
    const recipes = await this.recipeFileHandler.readRecipes();
    const anyRecipes = recipes && !!recipes.length;

    if (anyRecipes) {
      this.fillCategory(recipes, categoryId);
    }

    this.isLoading = false;
  }

  private setShowValue(recipes: Recipe[]): RecipeForList[] {
    return recipes.map((recipe) => createRecipeForList(recipe));
  }

  private fillCategory(recipes: Recipe[], categoryId: number): void {
    this.clearCategory();

    const filteredRecipes = recipes.filter((recipe: Recipe) => {
      return recipe.categoryId === categoryId;
    });

    this.categoryRecipes = this.setShowValue(filteredRecipes);

    this.hasRecipes = this.categoryRecipes.length > 0;
  }

  private clearCategory(): void {
    this.categoryRecipes.length = 0;
  }
}
