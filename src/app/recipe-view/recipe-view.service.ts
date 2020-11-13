import { Injectable } from '@angular/core';
import { Recipe } from '@core/models/recipe/recipe.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RecipeViewService {
  private recipe = new BehaviorSubject<Recipe>(null);
  public sharedRecipe = this.recipe.asObservable();

  public nextRecipe(recipe: Recipe): void {
    this.recipe.next(recipe);
  }
}
