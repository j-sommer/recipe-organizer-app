import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { InitialMessageComponent } from './initial-message/initial-message.component';
import { ListPlaceholderComponent } from './list-placeholder/list-placeholder.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CoreModule,
    TranslateModule.forChild(),
  ],
  declarations: [HomePage, ListPlaceholderComponent, InitialMessageComponent],
})
export class HomePageModule {}
