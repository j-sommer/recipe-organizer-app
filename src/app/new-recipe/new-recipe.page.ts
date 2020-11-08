import { Component } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/core';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.page.html',
  styleUrls: ['./new-recipe.page.scss'],
})
export class NewRecipePage {
  public readonly categories: string[] = [
    'Fleisch',
    'Backen',
    'Fisch',
    'Dessert',
    'Snacks',
  ];

  public tagInputValue = '';

  public selectedCategory = '';
  public tags: string[] = [];
  public ingredients: string[] = [];

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
      this.tags.push(tagValue);
      this.tagInputValue = '';
    }
  }

  public addIngredient(): void {
    this.ingredients.push('');
  }
}
