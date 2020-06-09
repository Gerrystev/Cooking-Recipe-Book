import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-upload-recipe',
  templateUrl: './upload-recipe.page.html',
  styleUrls: ['./upload-recipe.page.scss'],
})
export class UploadRecipePage implements OnInit {
  private recipeCloud: Observable<Recipe[]>;
  private recipeColumn: AngularFirestoreCollection<Recipe>;
  constructor(
    private fireStore: AngularFirestore
  ) {
    this.recipeColumn = this.fireStore.collection<Recipe>('Recipes');
  }

  ngOnInit() {
  }

  add_ingredients_field(){
    let markup = "<ion-row><ion-col><ion-input class=\"ingredients-field\" placeholder=\"1kg Sugar\"></ion-input></ion-col></ion-row>";
    document.getElementById("ingredients-section").outerHTML += markup;
  }
  
  add_directions_field(){
    let markup = "<ion-row><ion-col><ion-input class=\"ingredients-field\" placeholder=\"Boil the water for 10 minutes\"></ion-input></ion-col></ion-row>";
    document.getElementById("directions-section").outerHTML += markup;
  }
}
