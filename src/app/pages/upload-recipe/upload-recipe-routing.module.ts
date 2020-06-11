import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadRecipePage } from './upload-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: UploadRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadRecipePageRoutingModule {}
