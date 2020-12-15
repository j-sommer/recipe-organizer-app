import { Component } from '@angular/core';
import { Category } from '@core/models/category/category.model';
import { CategoryService } from '@core/services/category/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage {
  public readonly defaultCategoryId = this.categoryService.defaultCategory.id;
  public categories$: Observable<Category[]> = this.categoryService.categories$;

  public isSaving = false;

  constructor(private categoryService: CategoryService) {}

  public async saveCategories(): Promise<void> {
    try {
      const validCategories = this.categoryService
        .getCategoriesInstant()
        .filter((category) => category.name.trim());

      this.isSaving = true;
      await this.categoryService.saveCategories(validCategories);

      this.isSaving = false;
    } catch (error) {
      this.isSaving = false;
    }
  }

  public addCategory(): void {
    this.categoryService.addCategory();
  }
}
