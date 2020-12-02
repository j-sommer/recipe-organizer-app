import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadViewPage } from './read-view.page';

const routes: Routes = [
  {
    path: '',
    component: ReadViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadViewPageRoutingModule {}
