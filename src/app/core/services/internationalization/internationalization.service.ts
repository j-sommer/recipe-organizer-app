import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BehaviorSubject } from 'rxjs';

import { I18NPersistenceService } from './i18n-persistence.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Injectable({
  providedIn: 'root',
})
export class InternationalizationService {
  public readonly availableLocales = ['en', 'de'];

  private readonly defaultLocale = 'en';

  public curentLang: BehaviorSubject<string> = new BehaviorSubject(
    this.defaultLocale
  );

  constructor(
    private translate: TranslateService,
    private i18nPersistence: I18NPersistenceService
  ) {}

  public async initialize(): Promise<void> {
    this.translate.addLangs(this.availableLocales);
    this.translate.setDefaultLang(this.defaultLocale);

    let language = this.translate.defaultLang;

    const savedLanguage = await this.i18nPersistence.readLanguage();
    const deviceLanguage = navigator?.language;

    if (savedLanguage && this.isAvailable(savedLanguage)) {
      language = savedLanguage.substring(0, 2);
    } else if (deviceLanguage && this.isAvailable(deviceLanguage)) {
      language = deviceLanguage.substring(0, 2);

      this.i18nPersistence.saveLanguage(language);
    }

    this.translate.use(language);
    this.curentLang.next(language);

    this.translate.onLangChange.subscribe((changeEvent) =>
      this.curentLang.next(changeEvent.lang)
    );
  }

  public changeLanguage(lang: string): void {
    if (this.translate.langs.includes(lang)) {
      this.translate.use(lang);

      this.i18nPersistence.saveLanguage(lang);
    }
  }

  private isAvailable(lang: string): boolean {
    return this.availableLocales.includes(lang.substring(0, 2));
  }
}
