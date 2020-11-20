import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-menu',
  templateUrl: './recipe-menu.component.html',
  styleUrls: ['./recipe-menu.component.scss'],
})
export class RecipeMenuComponent {
  @Input()
  public edit: boolean;
  @Input()
  public save: () => void;
  @Input()
  public delete: () => void;

  constructor(private popoverController: PopoverController) {}

  public async onSaveClick(): Promise<void> {
    await this.popoverController.dismiss();

    this.save();
  }

  public async onDeleteClick(): Promise<void> {
    await this.popoverController.dismiss();

    this.delete();
  }
}
