import { Component } from '@angular/core';
import { InternationalizationService } from '@core/services/internationalization/internationalization.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent {
  public currentLanguage: BehaviorSubject<string> = this.internationalization
    .curentLang;
  public availLanguages: string[] = this.internationalization.availableLocales;

  constructor(private internationalization: InternationalizationService) {}

  public setLanguage(event): void {
    const lang = event.detail.value;

    this.internationalization.changeLanguage(lang);
  }
}
