import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from "../models/ingredient.model";
import { Direction } from "../models/direction.model";
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  private resepCol: AngularFirestoreCollection<Recipe>;
  id:string;
  ingredientsArray = [];
  directionsArray = [];
  step = [];
  data:string;
  private ingredientsColumn: AngularFirestoreCollection<Ingredient>;
  private directionsColumn: AngularFirestoreCollection<Direction>;
  classIngredients = <HTMLCollectionOf<HTMLIonInputElement>>(
    document.getElementsByClassName("ingredients-fielde")
  );
  constructor(public Activatedrouter: ActivatedRoute,
    public router: Router, private fireStore: AngularFirestore
    ) { 
      this.ingredientsColumn = this.fireStore.collection<Ingredient>("Ingredients");
      this.directionsColumn = this.fireStore.collection<Direction>("Directions");
      
    }

  ngOnInit() {
    this.Activatedrouter.paramMap.subscribe(paramMap => {
      if (!paramMap.has('idrecipe')) {
        return;
      }
      this.id = paramMap.get('idrecipe');
    })
    this.fireStore.collection<Ingredient>('Ingredients',ref=>ref.where('id_recipe','==',this.id)).valueChanges()
    .subscribe(val =>{
      this.step=val;
      // console.log(this.step);
      console.log("gerry ganteng");
      for(var i=0;i<this.step.length;i++){
        this.data=this.step[i].id;
        console.log(this.data);
        this.ingredientsColumn.doc(this.data).delete();
      }
    })
  }
  edit(){
    for (let i = 0; i < this.classIngredients.length; i++) {
      // console.log("Ingredients : " + classIngredients[i].value);
      let tempIngrediente = {
        id: 'string',
        description: this.classIngredients[i].value,
        step: i,
        id_recipe: this.id,
      };
      console.log(tempIngrediente);
      this.ingredientsColumn.add(tempIngrediente).then((resp) => {
        this.ingredientsColumn
          .doc(resp.id)
          .update({
            id: resp.id,
          })
          .catch((error) => {
            console.log(error);
          });
          console.log(resp.id);
      });
    }
    // alert("done");
  }

  add_ingredients_field() {
    this.ingredientsArray.push({ 'value': '' });
  }

  add_directions_field() {
    this.directionsArray.push({ 'value': '' });
  }
  backButton(){
    this.router.navigate(['/tabs/home']);
  }
}
