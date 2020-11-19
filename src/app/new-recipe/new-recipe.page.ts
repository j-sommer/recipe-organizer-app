import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
          this.newRecipe = historyData.recipe;
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
        await this.recipeFileHandler.saveRecipe(this.newRecipe);
      } else {
        await this.recipeFileHandler.saveNewRecipe(this.newRecipe);
      }

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
