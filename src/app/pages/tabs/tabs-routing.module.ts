import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'upload-recipe',
        canActivate: [AuthGuard],
        loadChildren: () => import('../upload-recipe/upload-recipe.module').then( m => m.UploadRecipePageModule)
      },
      {
        path: 'bookmark-recipes',
        canActivate: [AuthGuard],
        loadChildren: () => import('../bookmark-recipes/bookmark-recipes.module').then( m => m.BookmarkRecipesPageModule)
      },
      {
        path: 'details-recipe-online',
        canActivate: [AuthGuard],
        loadChildren: () => import('../details-recipe-online/details-recipe-online.module').then( m => m.DetailsRecipeOnlinePageModule)
      },
    ],
  },
  {
    path: 'tabs',
    redirectTo: './tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
