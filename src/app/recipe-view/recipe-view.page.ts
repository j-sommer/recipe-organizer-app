import { Component, OnInit } from '@angular/core';
import { Recipe } from '@core/models/recipe/recipe.model';
import { RecipeViewService } from './recipe-view.service';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.page.html',
  styleUrls: ['./recipe-view.page.scss'],
  providers: [RecipeViewService],
})
export class RecipeViewPage implements OnInit {
  public recipe: Recipe;

  constructor(private recipeViewService: RecipeViewService) {}

  public ngOnInit(): void {
    this.recipe = history.state.data;

    this.recipeViewService.nextRecipe(this.recipe);
  }
}
