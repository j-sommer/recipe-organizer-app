import { Injectable } from '@angular/core';
import {
  Plugins,
  FilesystemDirectory,
  FilesystemEncoding,
} from '@capacitor/core';
import { Recipe } from '@core/models/recipe/recipe.model';

const { Filesystem } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class RecipeFileHandlerService {
  public readonly recipeDirectory = 'recipes';

  private readonly filesystemDirectory = FilesystemDirectory.Documents;
  private readonly jsonFileExtension = '.json';

  public async createRecipeDir(): Promise<void> {
    try {
      await Filesystem.mkdir({
        path: this.recipeDirectory,
        directory: this.filesystemDirectory,
        recursive: false,
      });

      console.log('created dir');
    } catch (error) {
      console.error('Unable to make directory', error);
    }
  }

  public async writeRecipe(recipe: Recipe): Promise<void> {
    // TODO: MKDIR vorher ausühren
    try {
      const result = await Filesystem.writeFile({
        path: `${this.recipeDirectory}/${recipe.title}${this.jsonFileExtension}`,
        data: JSON.stringify(recipe),
        directory: this.filesystemDirectory,
        encoding: FilesystemEncoding.UTF8,
      });
      console.log('Wrote recipe to', result.uri);

      return Promise.resolve();
    } catch (error) {
      console.error('Unable to write reipce', error);
      return Promise.reject();
    }
  }

  public async readRecipes(): Promise<Recipe[]> {
    let recipes: Recipe[] = [];
    try {
      const recipeFiles = await Filesystem.readdir({
        path: this.recipeDirectory,
        directory: this.filesystemDirectory,
      });

      const readRecipesPromises = recipeFiles.files.map(
        async (recipeFile: string) => {
          try {
            const contents = await Filesystem.readFile({
              path: `${this.recipeDirectory}/${recipeFile}`,
              directory: this.filesystemDirectory,
              encoding: FilesystemEncoding.UTF8,
            });

            return JSON.parse(contents.data);
          } catch (error) {
            console.error(error);
          }
        }
      );

      recipes = await Promise.all(readRecipesPromises);
      return Promise.resolve(recipes);
    } catch (error) {
      console.error('Unable to read dir', error);
      return Promise.reject();
    }
  }
}
