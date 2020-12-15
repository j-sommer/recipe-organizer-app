import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '@core/models/category/category.model';
import { Recipe } from '@core/models/recipe/recipe.model';
import { CategoryService } from '@core/services/category/category.service';
import { RecipeFileHandlerService } from '@core/services/recipe-file-handler/recipe-file-handler.service';
import { imageBase64Prefix } from '@core/util/image-base64-prefix.const';
import { Observable } from 'rxjs';

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

  public readonly categories$: Observable<Category[]> = this.categoryService
    .categories$;
  public readonly imagePrefix = imageBase64Prefix;

  public tagInputValue = '';

  constructor(
    private recipeFileService: RecipeFileHandlerService,
    private categoryService: CategoryService
  ) {}

  public addTag(formValue): void {
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
