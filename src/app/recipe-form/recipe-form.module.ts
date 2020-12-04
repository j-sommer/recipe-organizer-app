import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { FormHeaderComponent } from './form-header/form-header.component';
import { GeneralComponent } from './general/general.component';
import { IngredientFormComponent } from './ingredients/ingredient-form/ingredient-form.component';
import { IngredientMenuComponent } from './ingredients/ingredient-menu/ingredient-menu.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { PreparationComponent } from './preparation/preparation.component';
import { RecipeFormPageRoutingModule } from './recipe-form-routing.module';
import { RecipeFormPage } from './recipe-form.page';

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
    PreparationComponent,
    IngredientsComponent,
    GeneralComponent,
    FormHeaderComponent,
    IngredientFormComponent,
    IngredientMenuComponent,
  ],
  entryComponents: [IngredientMenuComponent],
})
export class RecipeFormPageModule {}
