import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent {
  public currentLanguage: string = this.translate.currentLang;
  public availLanguages: string[] = this.translate.langs;

  constructor(private translate: TranslateService) {}

  public setLanguage(event): void {
    const selected = event.detail.value;
    if (this.translate.langs.includes(selected)) {
      this.translate.use(selected);
    }
  }
}
