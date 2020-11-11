import { Component, OnInit } from '@angular/core';
import { Recipe } from '@core/models/recipe/recipe.model';
import { RecipeFileHandlerService } from '@core/services/recipe-file-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public recipes: Recipe[] = [];

  constructor(private recipeFileHandler: RecipeFileHandlerService) {}

  public async ngOnInit(): Promise<void> {
    this.recipes = await this.recipeFileHandler.readRecipes();
  }
}
