import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { categoriesDE } from '@core/models/recipe/categories.const';
import { Recipe } from '@core/models/recipe/recipe.model';
import { RecipeFileHandlerService } from '@core/services/recipe-file-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public categories: { category: string; recipes: Recipe[] }[] = [];

  constructor(
    private recipeFileHandler: RecipeFileHandlerService,
    private router: Router
  ) {}

  public async ngOnInit(): Promise<void> {
    const recipes = await this.recipeFileHandler.readRecipes();

    if (recipes && recipes.length) {
      this.setupCategories();
      this.fillCategories(recipes);
    }
  }

  public onRecipeClick(recipe: Recipe): void {
    this.router.navigate(['/recipe-view'], { state: { data: recipe } });
  }

  private setupCategories(): void {
    categoriesDE.forEach((category: string) => {
      this.categories.push({ category, recipes: [] });
    });

    this.categories.push({ category: 'Andere', recipes: [] });
  }

  private fillCategories(recipes: Recipe[]): void {
    recipes.forEach((recipe: Recipe) => {
      const matchingCategory = this.categories.find(
        (category) => category.category === recipe.category
      );

      if (!matchingCategory) {
        this.categories
          .find((category) => category.category === 'Andere')
          .recipes.push(recipe);
        return;
      }

      matchingCategory.recipes.push(recipe);
    });
  }
}
