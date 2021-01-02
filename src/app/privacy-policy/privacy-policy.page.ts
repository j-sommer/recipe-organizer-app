import { Component, OnInit } from '@angular/core';
import { InternationalizationService } from '@core/services/internationalization/internationalization.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage {
  public currentLang = this.internationalizationService.curentLang;

  constructor(
    private internationalizationService: InternationalizationService
  ) {}
}
