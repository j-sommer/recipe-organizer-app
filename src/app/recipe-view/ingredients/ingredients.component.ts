import { Component } from '@angular/core';
import { Recipe } from '@core/models/recipe/recipe.model';
import { imageBase64Prefix } from '@core/util/image-base64-prefix.const';
import { Observable } from 'rxjs';

import { RecipeViewService } from '../recipe-view.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
})
export class IngredientsComponent {
  public readonly imagePrefix = imageBase64Prefix;

  public $recipe: Observable<Recipe> = this.recipeViewService.sharedRecipe;

  constructor(private recipeViewService: RecipeViewService) {}
}
