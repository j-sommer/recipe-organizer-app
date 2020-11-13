import { Component } from '@angular/core';
import { Recipe } from '@core/models/recipe/recipe.model';
import { Observable } from 'rxjs';

import { RecipeViewService } from '../recipe-view.service';

@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.scss'],
})
export class PreparationComponent {
  public $recipe: Observable<Recipe> = this.recipeViewService.sharedRecipe;

  constructor(private recipeViewService: RecipeViewService) {}
}
