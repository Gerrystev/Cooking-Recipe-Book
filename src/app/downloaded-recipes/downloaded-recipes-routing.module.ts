import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadedRecipesPage } from './downloaded-recipes.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadedRecipesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadedRecipesPageRoutingModule {}
