import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';

import { CategoryViewPageRoutingModule } from './category-view-routing.module';
import { CategoryViewPage } from './category-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryViewPageRoutingModule,
    CoreModule,
    TranslateModule.forChild(),
    QuillModule.forRoot(),
  ],
  declarations: [CategoryViewPage],
})
export class CategoryViewPageModule {}
