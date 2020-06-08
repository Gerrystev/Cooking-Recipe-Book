import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadRecipePageRoutingModule } from './upload-recipe-routing.module';

import { UploadRecipePage } from './upload-recipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadRecipePageRoutingModule
  ],
  declarations: [UploadRecipePage]
})
export class UploadRecipePageModule {}
