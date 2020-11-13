import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { IngredientsComponent } from './ingredients/ingredients.component';
import { PreparationComponent } from './preparation/preparation.component';
import { RecipeViewPageRoutingModule } from './recipe-view-routing.module';
import { RecipeViewPage } from './recipe-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeViewPageRoutingModule,
  ],
  declarations: [RecipeViewPage, IngredientsComponent, PreparationComponent],
})
export class RecipeViewPageModule {}
