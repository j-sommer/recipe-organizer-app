import { Component } from '@angular/core';
import { CategoryName } from '@core/models/category/category-name.enum';
import { Recipe } from '@core/models/recipe/recipe.model';
import { RecipeFileHandlerService } from '@core/services/recipe-file-handler.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.page.html',
  styleUrls: ['./new-recipe.page.scss'],
})
export class NewRecipePage {
  public segment = 'general';

  public newRecipe: Recipe = {
    title: '',
    category: CategoryName.Other,
    tags: [],
    ingredients: [],
    preparation: '',
  };

  constructor(
    private recipeFileHandler: RecipeFileHandlerService,
    private toastController: ToastController
  ) {}

  public async saveRecipe(): Promise<void> {
    try {
      await this.recipeFileHandler.writeRecipe(this.newRecipe);

      const successToast = await this.toastController.create({
        message: `Rezept '${this.newRecipe.title}' wurde gespeichert`,
        duration: 2500,
        color: 'medium',
        position: 'top',
      });

      successToast.present();
    } catch (error) {
      const errorToast = await this.toastController.create({
        message: 'Fehler beim Speichern',
        duration: 2000,
        color: 'danger',
        position: 'top',
      });

      errorToast.present();
    }
  }
}
