import { Component, EventEmitter, Input, Output } from '@angular/core';
import { quantityTypesDE } from '@core/const/quantity-types.const';
import { Ingredient } from '@core/models/recipe/ingredient.model';
import { ModalController } from '@ionic/angular';

import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';

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

  constructor(private modalController: ModalController) {}

  public async editIngredient(ingredient: Ingredient): Promise<void> {
    const modal = await this.modalController.create({
      component: IngredientFormComponent,
      componentProps: {
        ingredient,
      },
    });

    return await modal.present();
  }

  public addIngredient(): void {
    const newIngredient: Ingredient = {
      name: 'Mehl',
      quantity: 200,
      quantityType: 'g',
    };
    this.ingredients.push(newIngredient);
    this.ingredientsChange.emit(this.ingredients);
  }
}
