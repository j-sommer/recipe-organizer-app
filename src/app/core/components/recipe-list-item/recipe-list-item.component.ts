import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '@core/models/recipe/recipe.model';
import { imageBase64Prefix } from '@core/util/image-base64-prefix.const';
import { destinations } from 'src/app/app-routing.module';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.scss'],
})
export class RecipeListItemComponent {
  public readonly imagePrefix = imageBase64Prefix;

  @Input()
  public recipe: Recipe;

  constructor(private router: Router) {}

  public onRecipeClick(recipe: Recipe): void {
    this.router.navigate([destinations.recipeView], {
      state: { data: recipe },
    });
  }

  public editRecipe(): void {
    this.router.navigate([destinations.recipeForm], {
      queryParams: { edit: true },
      state: { data: { recipe: this.recipe } },
    });
  }
}
