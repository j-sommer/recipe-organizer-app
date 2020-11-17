import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryName } from '@core/models/category/category-name.enum';
import { Category } from '@core/models/category/category.model';
import { Recipe } from '@core/models/recipe/recipe.model';
import { RecipeFileHandlerService } from '@core/services/recipe-file-handler.service';
import { imageBase64Prefix } from '@core/util/image-base64-prefix.const';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public readonly imagePrefix = imageBase64Prefix;

  public categories: Category[] = [
    { name: CategoryName.Meat, recipes: [], icon: 'flame' },
    { name: CategoryName.Baking, recipes: [], icon: 'cafe' },
    { name: CategoryName.Dessert, recipes: [], icon: 'ice-cream' },
    { name: CategoryName.Fish, recipes: [], icon: 'fish' },
    { name: CategoryName.Snacks, recipes: [], icon: 'pizza' },
    { name: CategoryName.Other, recipes: [], icon: 'restaurant' },
  ];

  public hasRecipes = false;
  public isLoading = true;

  constructor(
    private recipeFileHandler: RecipeFileHandlerService,
    private router: Router
  ) {}

  public async ngOnInit(): Promise<void> {
    await this.recipeFileHandler.createRecipeDir();
    const recipes = await this.recipeFileHandler.readRecipes();
    this.hasRecipes = recipes && !!recipes.length;

    if (this.hasRecipes) {
      this.isLoading = false;
      this.fillCategories(recipes);
    }
  }

  public onRecipeClick(recipe: Recipe): void {
    this.router.navigate(['/recipe-view'], { state: { data: recipe } });
  }

  private fillCategories(recipes: Recipe[]): void {
    recipes.forEach((recipe: Recipe) => {
      const matchingCategory = this.categories.find(
        (category) => category.name === recipe.category
      );

      matchingCategory.recipes.push(recipe);
    });
  }
}
