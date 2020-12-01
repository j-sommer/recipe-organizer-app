import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryName } from '@core/models/category/category-name.enum';
import { Recipe } from '@core/models/recipe/recipe.model';
import { RecipeFileHandlerService } from '@core/services/recipe-file-handler.service';
import {
  AlertController,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { RecipeMenuComponent } from './recipe-menu/recipe-menu.component';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.page.html',
  styleUrls: ['./recipe-form.page.scss'],
})
export class RecipeFormPage implements OnDestroy {
  public segment = 'general';

  public currentRecipe: Recipe = {
    title: '',
    category: CategoryName.Other,
    tags: [],
    ingredientsGroups: [{ title: 'Hauptzutaten', ingredients: [] }],
    preparation: '',
  };

  public isEdit = false;

  private subscription: Subscription;

  constructor(
    private recipeFileHandler: RecipeFileHandlerService,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private popoverController: PopoverController,
    private alertController: AlertController
  ) {}

  public ionViewWillEnter(): void {
    this.subscription = this.route.queryParams.subscribe((params) => {
      if (params.edit) {
        const historyData = history?.state?.data;

        if (historyData) {
          this.currentRecipe = historyData.recipe;
          this.isEdit = true;
        } else {
          this.router.navigate(['/home']);
        }
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public async openRecipeMenu(event): Promise<void> {
    const popover = await this.popoverController.create({
      component: RecipeMenuComponent,
      event,
      translucent: true,
      animated: true,
      componentProps: {
        edit: this.isEdit,
        save: this.saveRecipe.bind(this),
        delete: this.deleteRecipe.bind(this),
      },
    });
    return await popover.present();
  }

  public async deleteRecipe(): Promise<void> {
    const alert = await this.alertController.create({
      header: this.translate.instant('recipe-form.delete-alert.header'),
      message: this.translate.instant('recipe-form.delete-alert.message'),
      buttons: [
        {
          text: this.translate.instant(
            'recipe-form.delete-alert.cancel-button'
          ),
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: this.translate.instant(
            'recipe-form.delete-alert.confirm-button'
          ),
          handler: async () => {
            await this.recipeFileHandler.deleteRecipe(this.currentRecipe);

            this.router.navigate(['/home']);
          },
        },
      ],
    });

    await alert.present();
  }

  public async saveRecipe(): Promise<void> {
    try {
      if (this.isEdit) {
        await this.recipeFileHandler.saveRecipe(this.currentRecipe);
      } else {
        await this.recipeFileHandler.saveNewRecipe(this.currentRecipe);
      }

      const successToast = await this.toastController.create({
        message: `Rezept '${this.currentRecipe.title}' wurde gespeichert`,
        duration: 2500,
        color: 'success',
        position: 'bottom',
      });

      successToast.present();
    } catch (error) {
      const errorToast = await this.toastController.create({
        message: 'Fehler beim Speichern',
        duration: 2000,
        color: 'danger',
        position: 'bottom',
      });

      errorToast.present();
    }
  }
}
