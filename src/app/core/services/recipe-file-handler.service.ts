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

  private readonly filesystemDirectory = FilesystemDirectory.Data;
  private readonly jsonFileExtension = '.json';

  public async createRecipeDir(): Promise<void> {
    try {
      const hasRecipeDir = await this.hasRecipeDir();

      if (!hasRecipeDir) {
        await Filesystem.mkdir({
          path: this.recipeDirectory,
          directory: this.filesystemDirectory,
          recursive: true,
        });

        console.log('created dir');
      }
    } catch (error) {
      console.error('Unable to make directory', error);
    }
  }

  public async writeRecipe(recipe: Recipe): Promise<void> {
    try {
      const fileName = this.generateFileName(recipe.title);

      const result = await Filesystem.writeFile({
        path: `${this.recipeDirectory}/${fileName}${this.jsonFileExtension}`,
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
    try {
      let recipes: Recipe[] = [];

      const hasRecipeDir = await this.hasRecipeDir();

      if (hasRecipeDir) {
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
      }
    } catch (error) {
      console.error('Unable to read dir', error);
      return Promise.reject();
    }
  }

  private generateFileName(title: string): string {
    const normalizedTitle = title.replace(/ /g, '-');
    return `${normalizedTitle.toLowerCase}_${Date.now()}`;
  }

  private async hasRecipeDir(): Promise<boolean> {
    try {
      const readResult = await Filesystem.readdir({
        path: '',
        directory: this.filesystemDirectory,
      });

      return Promise.resolve(
        readResult.files.some((file) => file === this.recipeDirectory)
      );
    } catch (error) {
      console.error('Unable to read dir', error);
      return Promise.reject();
    }
  }
}
