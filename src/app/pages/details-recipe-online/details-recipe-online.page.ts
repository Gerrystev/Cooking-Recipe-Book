import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Recipe } from 'src/app/models/recipe.model';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-details-recipe-online',
  templateUrl: './details-recipe-online.page.html',
  styleUrls: ['./details-recipe-online.page.scss'],
})
export class DetailsRecipeOnlinePage implements OnInit {
  private resepCol:AngularFirestoreCollection<Recipe>;
  id:string;
  cariresep:Observable<Recipe>;
  detresep:Recipe;
  ingredients:Observable<Ingredient>;
  ingr:Ingredient;
  private ingCol:AngularFirestoreCollection<Ingredient[]>;
  constructor(public Activatedrouter : ActivatedRoute,
    public router:Router,
    public firestore:AngularFirestore) {
      this.resepCol = this.firestore.collection<Recipe>('Resep');
    }
  ngOnInit() {
    this.Activatedrouter.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('idrecipe')){
        return;
      }
      this.id=paramMap.get('idrecipe');
      this.cariresep=this.getResep().valueChanges();
      this.cariresep.subscribe(isiResep =>{
        console.log(isiResep);
        this.detresep = isiResep;
      })
    })
  }
  getResep(): AngularFirestoreDocument<Recipe>{
    return this.firestore.collection('Recipes').doc(this.id);
  }
}
