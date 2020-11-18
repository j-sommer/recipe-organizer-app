import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { GeneralComponent } from './general/general.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { NewRecipePageRoutingModule } from './new-recipe-routing.module';
import { NewRecipePage } from './new-recipe.page';
import { PreparationComponent } from './preparation/preparation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewRecipePageRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    NewRecipePage,
    PreparationComponent,
    IngredientsComponent,
    GeneralComponent,
  ],
})
export class NewRecipePageModule {}
