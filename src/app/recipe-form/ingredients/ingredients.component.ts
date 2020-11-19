import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ingredient } from '@core/models/recipe/ingredient.model';
import { quantityTypesDE } from '@core/models/recipe/quantity-types.const';
import { ItemReorderEventDetail } from '@ionic/core';

@Component({
  selector: 'app-new-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
})
export class IngredientsComponent {
  public readonly quantityTypes: string[] = quantityTypesDE;

  @Input()
  public ingredients: Ingredient[];

  @Output()
  public ingredientsChange = new EventEmitter<Ingredient[]>();

  public doReorder(ev: CustomEvent<ItemReorderEventDetail>): void {
    const item = this.ingredients.splice(ev.detail.from, 1);

    this.ingredients.splice(ev.detail.to, 0, item[0]);

    ev.detail.complete();
    this.ingredientsChange.emit(this.ingredients);
  }

  public addIngredient(): void {
    const newIngredient: Ingredient = {
      name: '',
      quantity: null,
      quantityType: '',
    };
    this.ingredients.push(newIngredient);
    this.ingredientsChange.emit(this.ingredients);
  }
}
