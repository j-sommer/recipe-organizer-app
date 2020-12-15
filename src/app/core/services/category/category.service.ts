import { Injectable } from '@angular/core';
import { Category } from '@core/models/category/category.model';
import { cloneDeep } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';

import { CategoryPersistenceService } from '../category-persistence/category-persistence.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public readonly defaultCategory: Category = { name: 'default', id: 0 };

  public categories$: Observable<Category[]>;

  private categoriesSource = new BehaviorSubject<Category[]>([]);

  constructor(private categoryPersistence: CategoryPersistenceService) {
    this.categories$ = this.categoriesSource.asObservable();
  }

  public async initializeCategories(): Promise<void> {
    try {
      let categories = await this.categoryPersistence.readCategories();

      if (!categories.length) {
        categories = [this.defaultCategory];

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
