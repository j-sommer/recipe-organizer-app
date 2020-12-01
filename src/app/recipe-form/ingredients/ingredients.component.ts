import { Component, EventEmitter, Input, Output } from '@angular/core';
import { quantityTypesDE } from '@core/const/quantity-types.const';
import { IngredientGroup } from '@core/models/recipe/ingredient/ingredient-group.model';
import { Ingredient } from '@core/models/recipe/ingredient/ingredient.model';
import {
  AlertController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';
import {
  IngredientMenuAction,
  IngredientMenuComponent,
} from './ingredient-menu/ingredient-menu.component';

@Component({
  selector: 'app-new-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
})
export class IngredientsComponent {
  public readonly quantityTypes: string[] = quantityTypesDE;
  public readonly defaultGroupIndex = 0;

  @Input()
  public ingredientGroups: IngredientGroup[];

  @Output()
  public ingredientGroupsChange = new EventEmitter<IngredientGroup[]>();

  constructor(
    private translate: TranslateService,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private alertController: AlertController
  ) {}

  public async editIngredient(ingredient: Ingredient): Promise<void> {
    const modal = await this.modalController.create({
      component: IngredientFormComponent,
      componentProps: {
        ingredient,
      },
    });

    return await modal.present();
  }

  public async openIngredientsMenu(event): Promise<void> {
    const popover = await this.popoverController.create({
      component: IngredientMenuComponent,
      event,
      translucent: true,
      animated: true,
    });
    popover.present();

    return popover.onDidDismiss().then((dismissEvent: any) => {
      const action = dismissEvent.data.action;
      switch (action) {
        case IngredientMenuAction.AddGroup:
          this.groupCreation();
      }
    });
  }

  private async groupCreation(): Promise<void> {
    const alert = await this.alertController.create({
      header: this.translate.instant(
        'recipe-form.ingredients.edit.add-group.header'
      ),
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: this.translate.instant(
            'recipe-form.ingredients.edit.add-group.title-input'
          ),
          attributes: {
            required: true,
          },
        },
      ],
      buttons: [
        {
          text: this.translate.instant('general.select-cancel'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('general.add'),
          handler: (alertData) => {
            if (alertData.title) {
              this.addGroup(alertData.title);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  public async deleteIngredient(
    ingredientIndex: number,
    groupIndex: number
  ): Promise<void> {
    const currentGroup = this.ingredientGroups[groupIndex];

    currentGroup.ingredients.splice(ingredientIndex, 1);

    if (
      !currentGroup.ingredients.length &&
      groupIndex !== this.defaultGroupIndex
    ) {
      const alert = await this.alertController.create({
        header: this.translate.instant(
          'recipe-form.ingredients.edit.remove-group',
          { group: this.ingredientGroups[groupIndex].title }
        ),
        buttons: [
          {
            text: this.translate.instant('general.select-cancel'),
            role: 'cancel',
          },
          {
            text: this.translate.instant('general.delete'),
            handler: () => {
              this.ingredientGroups.splice(groupIndex, 1);
            },
          },
        ],
      });

      await alert.present();
    }
  }

  public addGroup(title: string): void {
    const newIngredient: Ingredient = {
      name: 'Mehl',
      quantity: 200,
      quantityType: 'g',
    };

    const newGroup: IngredientGroup = {
      title,
      ingredients: [newIngredient],
    };
    this.ingredientGroups.push(newGroup);
    this.ingredientGroupsChange.emit(this.ingredientGroups);
  }

  public addIngredient(groupIndex: number): void {
    const newIngredient: Ingredient = {
      name: 'Mehl',
      quantity: 200,
      quantityType: 'g',
    };
    this.ingredientGroups[groupIndex].ingredients.push(newIngredient);
    this.ingredientGroupsChange.emit(this.ingredientGroups);
  }
}
