import { Component } from '@angular/core';
import recipe01 from '@assets/sample-data/recipe-01.json';
import recipe02 from '@assets/sample-data/recipe-02.json';
import { Recipe } from '@core/models/recipe/recipe.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public readonly recipes: Recipe[] = [recipe01, recipe02];
}
