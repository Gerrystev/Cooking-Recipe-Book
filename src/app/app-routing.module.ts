import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
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
  },  {
    path: 'upload-recipe',
    loadChildren: () => import('./upload-recipe/upload-recipe.module').then( m => m.UploadRecipePageModule)
  },
  {
    path: 'bookmark-recipes',
    loadChildren: () => import('./bookmark-recipes/bookmark-recipes.module').then( m => m.BookmarkRecipesPageModule)
  },
  {
    path: 'downloaded-recipes',
    loadChildren: () => import('./downloaded-recipes/downloaded-recipes.module').then( m => m.DownloadedRecipesPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
