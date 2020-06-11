import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookmarkRecipesPageRoutingModule } from './bookmark-recipes-routing.module';

import { BookmarkRecipesPage } from './bookmark-recipes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookmarkRecipesPageRoutingModule
  ],
  declarations: [BookmarkRecipesPage]
})
export class BookmarkRecipesPageModule {}
