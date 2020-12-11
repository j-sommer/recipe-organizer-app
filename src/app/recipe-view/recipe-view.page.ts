import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '@core/models/recipe/recipe.model';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { destinations } from '../app-routing.module';
import { RecipeViewService } from './recipe-view.service';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.page.html',
  styleUrls: ['./recipe-view.page.scss'],
  providers: [RecipeViewService],
})
export class RecipeViewPage {
  public segment = 'ingredients';
  public recipe: Recipe;

  constructor(
    private recipeViewService: RecipeViewService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private actionSheetController: ActionSheetController
  ) {}

  public ionViewWillEnter(): void {
    this.recipe = history.state.data;

    if (!this.recipe) {
      this.router.navigate([destinations.home]);
    } else {
      this.recipeViewService.nextRecipe(this.recipe);
    }
  }

  public async openActionSheet(): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      header: this.translate.instant('recipe-view.action-sheet.title'),
      buttons: [
        {
          text: this.translate.instant('recipe-view.action-sheet.edit'),
          handler: this.editRecipe.bind(this),
        },
        {
          text: this.translate.instant('recipe-view.action-sheet.read-view'),
          handler: this.readRecipe.bind(this),
        },
      ],
    });
    await actionSheet.present();
  }

  private editRecipe(): void {
    this.router.navigate([destinations.recipeForm], {
      queryParams: { edit: true },
      state: { data: { recipe: this.recipe } },
    });
  }

  private readRecipe(): void {
    this.router.navigate([destinations.readView], {
      relativeTo: this.route,
      state: { data: { recipe: this.recipe } },
    });
  }
}
