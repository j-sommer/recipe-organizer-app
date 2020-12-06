import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

export enum IngredientMenuAction {
  AddGroup = 'AddGroup',
  DeleteGroup = 'DeleteGroup',
}

@Component({
  selector: 'app-ingredient-menu',
  templateUrl: './ingredient-menu.component.html',
  styleUrls: ['./ingredient-menu.component.scss'],
})
export class IngredientMenuComponent {
  public readonly IngredientMenuAction = IngredientMenuAction;

  @Input()
  public groupIndex: number;

  constructor(private popoverController: PopoverController) {}

  public propagateAction(action: IngredientMenuAction): void {
    this.popoverController.dismiss({ action, groupIndex: this.groupIndex });
  }
}
