import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';

import { GeneralComponent } from './general/general.component';
import { IngredientFormComponent } from './ingredients/ingredient-form/ingredient-form.component';
import { IngredientMenuComponent } from './ingredients/ingredient-menu/ingredient-menu.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { PreparationComponent } from './preparation/preparation.component';
import { RecipeFormPageRoutingModule } from './recipe-form-routing.module';
import { RecipeFormPage } from './recipe-form.page';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
  ],
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeFormPageRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    TranslateModule.forChild(),
    QuillModule.forRoot({ modules }),
  ],
  declarations: [
    RecipeFormPage,
    PreparationComponent,
    IngredientsComponent,
    GeneralComponent,
    IngredientFormComponent,
    IngredientMenuComponent,
  ],
  entryComponents: [IngredientMenuComponent],
})
export class RecipeFormPageModule {}
