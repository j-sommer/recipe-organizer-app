import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '@core/models/recipe/recipe.model';

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
    private route: ActivatedRoute
  ) {}

  public ionViewWillEnter(): void {
    this.recipe = history.state.data;

    if (!this.recipe) {
      this.router.navigate([destinations.home]);
    } else {
      this.recipeViewService.nextRecipe(this.recipe);
    }
  }

  public editRecipe(): void {
    this.router.navigate([destinations.recipeForm], {
      queryParams: { edit: true },
      state: { data: { recipe: this.recipe } },
    });
  }

  public readRecipe(): void {
    this.router.navigate([destinations.readView], {
      relativeTo: this.route,
      state: { data: { recipe: this.recipe } },
    });
  }
}
