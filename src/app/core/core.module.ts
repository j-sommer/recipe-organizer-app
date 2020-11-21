import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FloatingAddButtonComponent } from './components/floating-add-button/floating-add-button.component';

import { InitialMessageComponent } from './components/initial-message/initial-message.component';
import { ListPlaceholderComponent } from './components/list-placeholder/list-placeholder.component';
import { RecipeListItemComponent } from './components/recipe-list-item/recipe-list-item.component';
import { RecipeFileHandlerService } from './services/recipe-file-handler.service';

@NgModule({
  declarations: [
    ListPlaceholderComponent,
    InitialMessageComponent,
    RecipeListItemComponent,
    FloatingAddButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    IonicModule,
    TranslateModule.forChild(),
  ],
  providers: [RecipeFileHandlerService],
  exports: [
    ListPlaceholderComponent,
    InitialMessageComponent,
    RecipeListItemComponent,
    FloatingAddButtonComponent,
  ],
})
export class CoreModule {}
