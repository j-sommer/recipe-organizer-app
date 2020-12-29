import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BehaviorSubject } from 'rxjs';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Injectable({
  providedIn: 'root',
})
export class InternationalizationService {
  public readonly availableLocales = ['en', 'de'];

  public curentLang: BehaviorSubject<string>;

  private readonly defaultLocale = 'en';

  constructor(private translate: TranslateService) {}

  public initialize(): void {
    this.translate.addLangs(this.availableLocales);
    this.translate.setDefaultLang(this.defaultLocale);

    const deviceLanguage = navigator?.language;

    let language = this.translate.defaultLang;
    if (
      deviceLanguage &&
      this.availableLocales.includes(deviceLanguage.substring(0, 2))
    ) {
      language = deviceLanguage.substring(0, 2);
    }

    this.translate.use(language);

    this.curentLang = new BehaviorSubject(this.translate.currentLang);

    this.translate.onLangChange.subscribe((changeEvent) =>
      this.curentLang.next(changeEvent.lang)
    );
  }

  public changeLanguage(lang: string): void {
    if (this.translate.langs.includes(lang)) {
      this.translate.use(lang);
    }
  }
}
