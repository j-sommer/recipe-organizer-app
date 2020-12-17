import { Component } from '@angular/core';
import { Category } from '@core/models/category/category.model';
import { CategoryService } from '@core/services/category/category.service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage {
  public readonly defaultCategoryId = CategoryService.defaultCategoryId;
  public readonly defaultCategoryTranslationKey =
    CategoryService.defaultCategoryTranslationKey;

  public categories$: Observable<Category[]> = this.categoryService.categories$;

  private rollbackValue = '';

  constructor(
    private translate: TranslateService,
    private categoryService: CategoryService,
    private alertController: AlertController
  ) {}

  public onCategoryFocus(category: Category): void {
    this.rollbackValue = category.name;
  }

  public async onCategoryBlur(category: Category): Promise<void> {
    try {
      if (!category.name.trim()) {
        this.showDeleteAlert(category, this.rollbackValue);
      }

      await this.categoryService.saveCategories();

      this.rollbackValue = '';
    } catch (error) {}
  }

  public addCategory(): void {
    this.categoryService.addCategory();
  }

  public async showDeleteAlert(
    toDelete: Category,
    name?: string
  ): Promise<void> {
    const alert = await this.alertController.create({
      header: this.translate.instant('categories.remove-category', {
        category: name ? name : toDelete.name,
      }),
      message: this.translate.instant('categories.remove-category-message'),
      buttons: [
        {
          text: this.translate.instant('general.select-cancel'),
          role: 'cancel',
          handler: () => {
            if (name) {
              toDelete.name = name;
            }
          },
        },
        {
          text: this.translate.instant('general.delete'),
          handler: () => {
            this.categoryService.deleteCategory(toDelete);

            this.categoryService.saveCategories();
          },
        },
      ],
    });

    await alert.present();
  }
}
