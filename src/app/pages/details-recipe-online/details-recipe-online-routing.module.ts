import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsRecipeOnlinePage } from './details-recipe-online.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsRecipeOnlinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsRecipeOnlinePageRoutingModule {}
