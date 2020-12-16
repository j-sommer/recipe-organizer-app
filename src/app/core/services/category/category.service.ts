import { Injectable } from '@angular/core';
import { Category } from '@core/models/category/category.model';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';

import { CategoryPersistenceService } from '../category-persistence/category-persistence.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public static readonly defaultCategoryId = 0;
  public static readonly defaultCategoryTranslationKey =
    'category-view.default';

  public categories$: Observable<Category[]>;

  private categoriesSource = new BehaviorSubject<Category[]>([]);

  constructor(
    private categoryPersistence: CategoryPersistenceService,
    private translate: TranslateService
  ) {
    this.categories$ = this.categoriesSource.asObservable();
  }

  public async initializeCategories(): Promise<void> {
    try {
      let categories = await this.categoryPersistence.readCategories();

      if (!categories.length) {
        categories = [
          {
            name: 'default',
            id: CategoryService.defaultCategoryId,
          },
        ];

        await this.categoryPersistence.saveCategories(categories);
      }

      this.categoriesSource.next(categories);
    } catch (error) {
      return Promise.reject();
    }
  }

  public async saveCategories(categories: Category[]): Promise<void> {
    try {
      await this.categoryPersistence.saveCategories(categories);

      this.categoriesSource.next(categories);
    } catch (error) {
      return Promise.reject();
    }
  }

  public addCategory(): void {
    const categories: Category[] = cloneDeep(this.categoriesSource.value);

    categories.push({
      name: '',
      id: categories.length + 1,
    });

    this.categoriesSource.next(categories);
  }

  public getCategoriesInstant(): Category[] {
    return this.categoriesSource.value;
  }
}
