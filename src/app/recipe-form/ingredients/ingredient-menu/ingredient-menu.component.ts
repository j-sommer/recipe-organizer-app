import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

export enum IngredientMenuAction {
  AddGroup = 'AddGroup',
}

@Component({
  selector: 'app-ingredient-menu',
  templateUrl: './ingredient-menu.component.html',
  styleUrls: ['./ingredient-menu.component.scss'],
})
export class IngredientMenuComponent {
  public readonly IngredientMenuAction = IngredientMenuAction;

  constructor(private popoverController: PopoverController) {}

  public propagateAction(action: IngredientMenuAction): void {
    this.popoverController.dismiss({ action });
  }
}
