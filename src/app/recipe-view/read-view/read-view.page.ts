import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '@core/models/recipe/recipe.model';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { destinations } from 'src/app/app-routing.module';

@Component({
  selector: 'app-read-view',
  templateUrl: './read-view.page.html',
  styleUrls: ['./read-view.page.scss'],
})
export class ReadViewPage implements OnInit, OnDestroy {
  public recipe: Recipe;

  public fontSize = 1;

  public increaseFont(): void {
    this.fontSize = this.fontSize * 1.1;
  }

  public decreaseFont(): void {
    this.fontSize = this.fontSize * 0.9;
  }

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
      this.router.navigate([destinations.home]);
    }
  }

  public navigateBack(): void {
    this.router.navigate([destinations.recipeView], {
      state: { data: this.recipe },
    });
  }
}
