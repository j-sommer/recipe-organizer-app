import { Component, EventEmitter, Input, Output } from '@angular/core';
import { quantityTypesDE } from '@core/const/quantity-types.const';
import { Ingredient } from '@core/models/recipe/ingredient/ingredient.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.scss'],
})
export class IngredientFormComponent {
  public readonly quantityTypes: string[] = quantityTypesDE;

  @Input()
  public ingredient: Ingredient;

  @Output()
  public ingredientChange = new EventEmitter<Ingredient>();

  constructor(private modalController: ModalController) {}

  public dismissModal(): void {
    this.modalController.dismiss();
  }
}
