import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryName } from '@core/models/category/category-name.enum';
import { Recipe } from '@core/models/recipe/recipe.model';
import { RecipeFileHandlerService } from '@core/services/recipe-file-handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.page.html',
  styleUrls: ['./category-view.page.scss'],
})
export class CategoryViewPage implements OnDestroy {
  public category: CategoryName;
  public categoryRecipes: Recipe[] = [];

  public hasRecipes = false;
  public isLoading = true;

  private subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeFileHandler: RecipeFileHandlerService
  ) {}

  public async ionViewWillEnter(): Promise<void> {
    this.extractCategoryFromRoute();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private extractCategoryFromRoute(): void {
    this.subscription = this.route.queryParams.subscribe((params) => {
      if (!params.category) {
        this.router.navigate(['/home']);
      }

      this.category = params.category;
      this.loadRecipes(params.category);
    });
  }

  private async loadRecipes(category: CategoryName): Promise<void> {
    const recipes = await this.recipeFileHandler.readRecipes();
    const anyRecipes = recipes && !!recipes.length;

    if (anyRecipes) {
      this.fillCategory(recipes, category);
      this.isLoading = false;
    }
  }

  private fillCategory(recipes: Recipe[], category: CategoryName): void {
    this.clearCategory();

    this.categoryRecipes = recipes.filter(
      (recipe) => recipe.category === category
    );

    this.hasRecipes = this.categoryRecipes.length > 0;
  }

  private clearCategory(): void {
    this.categoryRecipes.length = 0;
  }
}
