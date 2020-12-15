import { Injectable } from '@angular/core';
import {
  FilesystemDirectory,
  FilesystemEncoding,
  Plugins,
} from '@capacitor/core';
import { Category } from '@core/models/category/category.model';

const { Filesystem } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class CategoryPersistenceService {
  private readonly filesystemDirectory = FilesystemDirectory.Data;
  private readonly fileName = 'categories.json';

  public async saveCategories(categories: Category[]): Promise<void> {
    try {
      const result = await Filesystem.writeFile({
        path: this.fileName,
        data: JSON.stringify(categories),
        directory: this.filesystemDirectory,
        encoding: FilesystemEncoding.UTF8,
      });

      console.log('Wrote categories to', result.uri);

      return Promise.resolve();
    } catch (error) {
      console.error('Unable to write categories', error);
      return Promise.reject();
    }
  }

  public async readCategories(): Promise<Category[]> {
    const hasCategoriesFile = await this.hasCategoriesFile();

    if (!hasCategoriesFile) {
      this.saveCategories([]);
      return Promise.resolve([]);
    }

    const contents = await Filesystem.readFile({
      path: this.fileName,
      directory: this.filesystemDirectory,
      encoding: FilesystemEncoding.UTF8,
    });

    const categories = JSON.parse(contents.data);
    return Promise.resolve(categories);
  }

  public async hasCategoriesFile(): Promise<boolean> {
    try {
      const readResult = await Filesystem.readdir({
        path: '',
        directory: this.filesystemDirectory,
      });

      return Promise.resolve(
        readResult.files.some((file) => file === this.fileName)
      );
    } catch (error) {
      console.error('Unable to read dir', error);
      return Promise.reject();
    }
  }
}
