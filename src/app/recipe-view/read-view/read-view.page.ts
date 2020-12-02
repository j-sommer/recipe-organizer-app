import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '@core/models/recipe/recipe.model';

import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
  selector: 'app-read-view',
  templateUrl: './read-view.page.html',
  styleUrls: ['./read-view.page.scss'],
})
export class ReadViewPage implements OnInit, OnDestroy {
  public recipe: Recipe;

  constructor(private router: Router, private insomnia: Insomnia) {}

  public ngOnInit(): void {
    this.insomnia.keepAwake().catch((error) => console.log(error));
  }

  public ngOnDestroy(): void {
    this.insomnia.allowSleepAgain().catch((error) => console.log(error));
  }

  public ionViewWillEnter(): void {
    this.recipe = history.state.data?.recipe;

    if (!this.recipe) {
      this.router.navigate(['/home']);
    }
  }
}
