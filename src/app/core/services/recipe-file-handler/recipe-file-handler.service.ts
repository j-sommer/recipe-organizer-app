import { Injectable } from '@angular/core';
import {
  Plugins,
  FilesystemDirectory,
  CameraResultType,
  FilesystemEncoding,
} from '@capacitor/core';
import { Recipe } from '@core/models/recipe/recipe.model';

const { Filesystem, Camera } = Plugins;

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

  public async saveNewRecipe(recipe: Recipe): Promise<string> {
    try {
      const fileName = this.generateFileName(recipe.title);

      const result = await Filesystem.writeFile({
        path: `${this.recipeDirectory}/${fileName}`,
        data: JSON.stringify(recipe),
        directory: this.filesystemDirectory,
        encoding: FilesystemEncoding.UTF8,
      });

      console.log('Wrote recipe to', result.uri);

      return Promise.resolve(fileName);
    } catch (error) {
      console.error('Unable to write recipe', error);
      return Promise.reject();
    }
  }

  public async saveRecipe(recipe: Recipe): Promise<void> {
    try {
      const result = await Filesystem.writeFile({
        path: `${this.recipeDirectory}/${recipe.filePath}`,
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

  public async deleteRecipe(recipe: Recipe): Promise<void> {
    try {
      const result = await Filesystem.deleteFile({
        path: `${this.recipeDirectory}/${recipe.filePath}`,
        directory: this.filesystemDirectory,
      });

      console.log('recipe deleted', recipe.filePath);

      return Promise.resolve();
    } catch (error) {
      console.error('Unable to delete reipce', error);
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

              const recipeData = JSON.parse(contents.data);
              recipeData.filePath = recipeFile;
              return recipeData;
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

  public async getPhoto(): Promise<string> {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
      });

      return photo.base64String;
    } catch (error) {
      console.error('Unable to get photo', error);
      return Promise.reject();
    }
  }

  private generateFileName(title: string): string {
    const normalizedTitle = title.replace(/ /g, '-');
    const titleWithTimestampAndExtension = `${normalizedTitle.toLowerCase()}_${Date.now()}${
      this.jsonFileExtension
    }`;
    return titleWithTimestampAndExtension;
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
