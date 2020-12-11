import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getCategories } from '@core/models/category/category-name.enum';
import { Recipe } from '@core/models/recipe/recipe.model';
import { RecipeFileHandlerService } from '@core/services/recipe-file-handler/recipe-file-handler.service';
import { imageBase64Prefix } from '@core/util/image-base64-prefix.const';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent {
  @Input()
  public recipe: Recipe;

  @Output()
  public recipeChange = new EventEmitter<Recipe>();

  public readonly categories: string[] = getCategories();
  public readonly imagePrefix = imageBase64Prefix;

  public tagInputValue = '';

  constructor(private recipeFileService: RecipeFileHandlerService) {}

  public addTag(formValue) {
    const tagValue = formValue.tagValue;

    if (tagValue) {
      this.recipe.tags.push(tagValue);
      this.tagInputValue = '';
    }
  }

  public async getPhoto(): Promise<void> {
    try {
      const photoAsBase64 = await this.recipeFileService.getPhoto();
      if (photoAsBase64) {
        this.recipe.img = photoAsBase64;
      }
    } catch (error) {}
  }
}
