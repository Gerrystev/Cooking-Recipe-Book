import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsRecipeOnlinePageRoutingModule } from './details-recipe-online-routing.module';

import { DetailsRecipeOnlinePage } from './details-recipe-online.page';

import { RatingComponent } from '../../rating/rating.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsRecipeOnlinePageRoutingModule
  ],
  declarations: [DetailsRecipeOnlinePage, RatingComponent]
})
export class DetailsRecipeOnlinePageModule {}
