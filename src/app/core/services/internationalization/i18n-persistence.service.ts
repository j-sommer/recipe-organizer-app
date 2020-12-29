import { Injectable } from '@angular/core';
import {
  FilesystemDirectory,
  FilesystemEncoding,
  Plugins,
} from '@capacitor/core';

const { Filesystem } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class I18NPersistenceService {
  private readonly filesystemDirectory = FilesystemDirectory.Data;
  private readonly fileName = 'language-settings.json';

  public async saveLanguage(lang: string): Promise<void> {
    try {
      await Filesystem.writeFile({
        path: this.fileName,
        data: JSON.stringify(lang),
        directory: this.filesystemDirectory,
        encoding: FilesystemEncoding.UTF8,
      });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  public async readLanguage(): Promise<string> {
    const hasLanguageFile = await this.hasLanguageFile();

    if (!hasLanguageFile) {
      return Promise.resolve(null);
    }

    const contents = await Filesystem.readFile({
      path: this.fileName,
      directory: this.filesystemDirectory,
      encoding: FilesystemEncoding.UTF8,
    });

    const lang = JSON.parse(contents.data);
    return Promise.resolve(lang);
  }

  public async hasLanguageFile(): Promise<boolean> {
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
