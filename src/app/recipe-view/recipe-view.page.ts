import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '@core/models/recipe/recipe.model';

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
      this.router.navigate(['/home']);
    } else {
      this.recipeViewService.nextRecipe(this.recipe);
    }
  }

  public editRecipe(): void {
    this.router.navigate(['/recipe-form'], {
      queryParams: { edit: true },
      state: { data: { recipe: this.recipe } },
    });
  }

  public readRecipe(): void {
    this.router.navigate(['read-view'], {
      relativeTo: this.route,
      state: { data: { recipe: this.recipe } },
    });
  }
}
