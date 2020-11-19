import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'recipe-form',
    loadChildren: () =>
      import('./recipe-form/recipe-form.module').then(
        (m) => m.RecipeFormPageModule
      ),
  },
  {
    path: 'recipe-view',
    loadChildren: () =>
      import('./recipe-view/recipe-view.module').then(
        (m) => m.RecipeViewPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
