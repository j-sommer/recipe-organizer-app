import { Component } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/core';

import { categoriesDE } from '@core/models/recipe/categories.const';
import { Recipe } from '@core/models/recipe/recipe.model';
import { Ingredient } from '@core/models/recipe/ingredient.model';
import { quantityTypesDE } from '@core/models/recipe/quantity-types.const';
import { RecipeFileHandlerService } from '@core/services/recipe-file-handler.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.page.html',
  styleUrls: ['./new-recipe.page.scss'],
})
export class NewRecipePage {
  public readonly categories: string[] = categoriesDE;
  public readonly quantityTypes: string[] = quantityTypesDE;

  public tagInputValue = '';

  public newRecipe: Recipe = {
    title: '',
    category: '',
    tags: [],
    ingredients: [],
    preparation: '',
  };

  constructor(private recipeFileHandler: RecipeFileHandlerService) {}

  public doReorder(ev: CustomEvent<ItemReorderEventDetail>): void {
    const item = this.newRecipe.ingredients.splice(ev.detail.from, 1);

    this.newRecipe.ingredients.splice(ev.detail.to, 0, item[0]);

    ev.detail.complete();
  }

  public addTag(formValue) {
    const tagValue = formValue.tagValue;

    if (tagValue) {
      this.newRecipe.tags.push(tagValue);
      this.tagInputValue = '';
    }
  }

  public addIngredient(): void {
    const newIngredient: Ingredient = {
      name: '',
      quantity: 0,
      quantityType: '',
    };
    this.newRecipe.ingredients.push(newIngredient);
  }

  public async saveRecipe(): Promise<void> {
    this.recipeFileHandler.writeRecipe(this.newRecipe);
  }
}
