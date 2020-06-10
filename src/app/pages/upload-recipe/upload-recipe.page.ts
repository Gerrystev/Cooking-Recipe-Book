import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { map } from 'rxjs/operators';
import { Ingredient } from '../../models/ingredient.model';
import { Media } from '../../models/media.model';
import { Direction } from '../../models/direction.model';

@Component({
  selector: 'app-upload-recipe',
  templateUrl: './upload-recipe.page.html',
  styleUrls: ['./upload-recipe.page.scss'],
})
export class UploadRecipePage implements OnInit {
  private recipeCloud: Observable<Recipe[]>;
  private recipeColumn: AngularFirestoreCollection<Recipe>;
  private ingredientsColumn: AngularFirestoreCollection<Ingredient>;
  private mediaColumn: AngularFirestoreCollection<Media>;
  private directionsColumn: AngularFirestoreCollection<Direction>;

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

  upload_recipe(){
    let classIngredients = document.getElementsByClassName("ingredients-field");
    let classDirections = document.getElementsByClassName("directions-field");
    
    // // insert ingredients to firebase
    // for(let i=0;i<classIngredients.length;i++){
    //   let tempIngredient = {
    //     id : 'string',
    //     description : 'string',  
    //     id_recipe : 'string'
    //   }
    //   this.ingredientsColumn.add(tempIngredient);
    // }
  }

  getLastRecipe(id: string) : AngularFirestoreDocument<Recipe> {
    // this.recipeCloud = this.recipeColumn.snapshotChanges().pipe(
    //   map(actions => {
    //     return actions.map( a => {
    //       const data = a.payload.doc.data();
    //       const id = a.payload.doc.id;
    //       return {id, ...data};
    //     })
    //   })
    // )
    console.log(this.recipeCloud);
    return this.fireStore.collection('Recipe').doc(id);
  }
}
