import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ReadViewPageRoutingModule } from './read-view-routing.module';
import { ReadViewPage } from './read-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadViewPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [ReadViewPage],
})
export class ReadViewPageModule {}
