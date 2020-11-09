import { Component } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/core';

import { categoriesDE } from '@core/models/recipe/categories.const';
import { Recipe } from '@core/models/recipe/recipe.model';
import { Ingredient } from '@core/models/recipe/ingredient.model';
import { quantityTypesDE } from '@core/models/recipe/quantity-types.const';

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

  public doReorder(ev: CustomEvent<ItemReorderEventDetail>): void {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
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
}
