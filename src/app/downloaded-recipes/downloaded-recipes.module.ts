import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloadedRecipesPageRoutingModule } from './downloaded-recipes-routing.module';

import { DownloadedRecipesPage } from './downloaded-recipes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadedRecipesPageRoutingModule
  ],
  declarations: [DownloadedRecipesPage]
})
export class DownloadedRecipesPageModule {}
