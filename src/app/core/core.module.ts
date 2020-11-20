import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InitialMessageComponent } from './components/initial-message/initial-message.component';
import { ListPlaceholderComponent } from './components/list-placeholder/list-placeholder.component';
import { RecipeFileHandlerService } from './services/recipe-file-handler.service';

@NgModule({
  declarations: [ListPlaceholderComponent, InitialMessageComponent],
  imports: [CommonModule],
  providers: [RecipeFileHandlerService],
})
export class CoreModule {}
