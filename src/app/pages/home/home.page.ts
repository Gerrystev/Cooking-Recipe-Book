import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private recipeCloud: Observable<Recipe[]>;
  private recipeColumn: AngularFirestoreCollection<Recipe>;

  constructor(
    private activatedRoute: ActivatedRoute, 
    public router:Router,
    private actionSheetController: ActionSheetController,
    private plt: Platform,
    private fireStore: AngularFirestore,
  ) {
    this.recipeColumn = this.fireStore.collection<Recipe>('Recipes');
    this.recipeCloud = this.recipeColumn.snapshotChanges().pipe(
      map(actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        })
      })
    )
  }
 
  ngOnInit() {
    
  }
  kelogin(){
    this.router.navigate(['/login']);
  }

  toDetails(id: string){
    this.router.navigate(['/tabs/details-recipe-online', id]);
  }

}
