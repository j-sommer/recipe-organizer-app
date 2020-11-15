import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getCategories } from '@core/models/category/category-name.enum';
import { Recipe } from '@core/models/recipe/recipe.model';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent {
  public readonly categories: string[] = getCategories();

  public tagInputValue = '';

  @Input()
  public recipe: Recipe;

  @Output()
  public recipeChange = new EventEmitter<Recipe>();

  public addTag(formValue) {
    const tagValue = formValue.tagValue;

    if (tagValue) {
      this.recipe.tags.push(tagValue);
      this.tagInputValue = '';
    }
  }
}
