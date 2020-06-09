import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'upload-recipe',
    loadChildren: () => import('./pages/upload-recipe/upload-recipe.module').then( m => m.UploadRecipePageModule)
  },
  {
    path: 'bookmark-recipes',
    loadChildren: () => import('./pages/bookmark-recipes/bookmark-recipes.module').then( m => m.BookmarkRecipesPageModule)
  },
  {
    path: 'downloaded-recipes',
    loadChildren: () => import('./pages/downloaded-recipes/downloaded-recipes.module').then( m => m.DownloadedRecipesPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
