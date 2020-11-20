import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { GeneralComponent } from './general/general.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { PreparationComponent } from './preparation/preparation.component';
import { RecipeFormPageRoutingModule } from './recipe-form-routing.module';
import { RecipeFormPage } from './recipe-form.page';
import { RecipeMenuComponent } from './recipe-menu/recipe-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeFormPageRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    RecipeFormPage,
    RecipeMenuComponent,
    PreparationComponent,
    IngredientsComponent,
    GeneralComponent,
  ],
  entryComponents: [RecipeMenuComponent],
})
export class RecipeFormPageModule {}
