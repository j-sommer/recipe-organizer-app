import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IngredientsComponent } from './ingredients/ingredients.component';
import { PreparationComponent } from './preparation/preparation.component';
import { RecipeViewPage } from './recipe-view.page';

const routes: Routes = [
  {
    path: '',
    component: RecipeViewPage,
    children: [
      { path: 'ingredients', component: IngredientsComponent },
      { path: 'preparation', component: PreparationComponent },
      { path: '', redirectTo: 'ingredients' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeViewPageRoutingModule {}
