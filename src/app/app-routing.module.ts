import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const destinations = {
  home: 'home',
  recipeForm: 'recipe-form',
  recipeView: 'recipe-view',
  readView: 'read-view',
  categoryView: 'category-view',
  settings: 'settings',
};

const routes: Routes = [
  {
    path: destinations.home,
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: destinations.home,
    pathMatch: 'full',
  },
  {
    path: destinations.recipeForm,
    loadChildren: () =>
      import('./recipe-form/recipe-form.module').then(
        (m) => m.RecipeFormPageModule
      ),
  },
  {
    path: destinations.recipeView,
    loadChildren: () =>
      import('./recipe-view/recipe-view.module').then(
        (m) => m.RecipeViewPageModule
      ),
  },
  {
    path: destinations.categoryView,
    loadChildren: () =>
      import('./category-view/category-view.module').then(
        (m) => m.CategoryViewPageModule
      ),
  },
  {
    path: destinations.settings,
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsPageModule),
  },  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
