import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { FloatingAddButtonComponent } from './components/floating-add-button/floating-add-button.component';
import { InitialMessageComponent } from './components/initial-message/initial-message.component';
import { ListPlaceholderComponent } from './components/list-placeholder/list-placeholder.component';
import { RecipeListItemComponent } from './components/recipe-list-item/recipe-list-item.component';
import { RecipeViewToolbarComponent } from './components/recipe-view-toolbar/recipe-view-toolbar.component';
import { AppSettingsService } from './services/app-settings/app-settings.service';
import { CategoryPersistenceService } from './services/category-persistence/category-persistence.service';
import {
  createTranslateLoader,
  InternationalizationService,
} from './services/internationalization/internationalization.service';
import { RecipeFileHandlerService } from './services/recipe-file-handler/recipe-file-handler.service';
import { RecipeService } from './services/recipe/recipe.service';

@NgModule({
  declarations: [
    ListPlaceholderComponent,
    InitialMessageComponent,
    RecipeListItemComponent,
    FloatingAddButtonComponent,
    RecipeViewToolbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    IonicModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    RecipeFileHandlerService,
    AppSettingsService,
    CategoryPersistenceService,
    RecipeService,
    InternationalizationService,
  ],
  exports: [
    ListPlaceholderComponent,
    InitialMessageComponent,
    RecipeListItemComponent,
    FloatingAddButtonComponent,
    RecipeViewToolbarComponent,
  ],
})
export class CoreModule {}
