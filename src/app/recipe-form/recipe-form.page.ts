import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryName } from '@core/models/category/category-name.enum';
import { Recipe } from '@core/models/recipe/recipe.model';
import { RecipeFileHandlerService } from '@core/services/recipe-file-handler.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.page.html',
  styleUrls: ['./recipe-form.page.scss'],
})
export class RecipeFormPage {
  public segment = 'general';

  public currentRecipe: Recipe = {
    title: '',
    category: CategoryName.Other,
    tags: [],
    ingredients: [],
    preparation: '',
  };

  public isEdit = false;

  constructor(
    private recipeFileHandler: RecipeFileHandlerService,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ionViewWillEnter(): void {
    this.route.queryParams.subscribe((params) => {
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
        color: 'medium',
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
