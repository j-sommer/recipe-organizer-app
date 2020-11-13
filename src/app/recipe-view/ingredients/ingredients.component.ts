import { Component } from '@angular/core';
import { Recipe } from '@core/models/recipe/recipe.model';
import { Observable } from 'rxjs';

import { RecipeViewService } from '../recipe-view.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
})
export class IngredientsComponent {
  public $recipe: Observable<Recipe> = this.recipeViewService.sharedRecipe;

  constructor(private recipeViewService: RecipeViewService) {}
}
