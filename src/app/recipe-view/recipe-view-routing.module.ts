import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeViewPage } from './recipe-view.page';

const routes: Routes = [
  {
    path: '',
    component: RecipeViewPage,
  },  {
    path: 'read-view',
    loadChildren: () => import('./read-view/read-view.module').then( m => m.ReadViewPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeViewPageRoutingModule {}
