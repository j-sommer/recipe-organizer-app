import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '@core/models/recipe/recipe.model';
import { CategoryService } from '@core/services/category/category.service';
import { RecipeFileHandlerService } from '@core/services/recipe-file-handler/recipe-file-handler.service';
import {
  ActionSheetController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { destinations } from '../app-routing.module';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.page.html',
  styleUrls: ['./recipe-form.page.scss'],
})
export class RecipeFormPage implements OnDestroy {
  public segment = 'general';

  public currentRecipe: Recipe = {
    title: '',
    categoryId: CategoryService.defaultCategoryId,
    tags: [],
    ingredientsGroups: [
      {
        title: this.translate.instant(
          'recipe-form.ingredients.initial-group-name'
        ),
        ingredients: [],
      },
    ],
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
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
  ) {}

  public ionViewWillEnter(): void {
    this.subscription = this.route.queryParams.subscribe((params) => {
      if (params.edit) {
        const historyData = history?.state?.data;

        if (historyData) {
          this.currentRecipe = historyData.recipe;
          this.isEdit = true;
        } else {
          this.router.navigate([destinations.home]);
        }
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public async openActionSheet(): Promise<void> {
    const actionSheetOptions: any = {
      header: this.translate.instant('recipe-form.recipe-menu.title'),
      buttons: [
        {
          text: this.translate.instant('recipe-form.recipe-menu.save'),
          handler: this.saveRecipe.bind(this),
        },
      ],
    };

    if (this.isEdit) {
      actionSheetOptions.buttons.push({
        text: this.translate.instant('recipe-form.recipe-menu.delete'),
        role: 'destructive',
        cssClass: 'danger',
        handler: this.deleteRecipe.bind(this),
      });
    }

    const actionSheet = await this.actionSheetController.create(
      actionSheetOptions
    );
    await actionSheet.present();
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
          role: 'destructive',
          cssClass: 'danger',
          handler: async () => {
            try {
              await this.recipeFileHandler.deleteRecipe(this.currentRecipe);

              this.router.navigate([destinations.home]);
            } catch (error) {
              const errorToast = await this.toastController.create({
                message: this.translate.instant(
                  'recipe-form.delete-alert.error'
                ),
                duration: 2000,
                color: 'danger',
                position: 'bottom',
              });

              errorToast.present();
            }
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
        this.currentRecipe.filePath = await this.recipeFileHandler.saveNewRecipe(
          this.currentRecipe
        );

        this.isEdit = true;
      }

      const successToast = await this.toastController.create({
        message: this.translate.instant('recipe-form.on-save.success', {
          recipe: this.currentRecipe.title,
        }),
        duration: 2500,
        color: 'success',
        position: 'bottom',
      });

      successToast.present();
    } catch (error) {
      const errorToast = await this.toastController.create({
        message: this.translate.instant('recipe-form.on-save.error'),
        duration: 2000,
        color: 'danger',
        position: 'bottom',
      });

      errorToast.present();
    }
  }
}
