import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookmarkRecipesPage } from './bookmark-recipes.page';

const routes: Routes = [
  {
    path: '',
    component: BookmarkRecipesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookmarkRecipesPageRoutingModule {}
