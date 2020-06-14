import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map, throwIfEmpty, filter } from 'rxjs/operators';
import { Recipe } from 'src/app/models/recipe.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private recipeCloud: Observable<Recipe[]>;
  private recipeColumn: AngularFirestoreCollection<Recipe>;
  public recipeList = [];

  constructor(
    private activatedRoute: ActivatedRoute, 
    public router:Router,
    private actionSheetController: ActionSheetController,
    private plt: Platform,
    private fireStore: AngularFirestore,
  ) {
    this.recipeColumn = this.fireStore.collection<Recipe>('Recipes');
  }

  async initializeItems(): Promise<any> {
    const foodList = await this.fireStore.collection('Recipes')
      .valueChanges().pipe(first()).toPromise();
    return foodList;
  }

  async ngOnInit() {
    this.recipeList = await this.initializeItems();
    console.log(this.recipeList);
  }

  async ionViewWillEnter(){
    // this.recipeList = await this.initializeItems();
    // console.log(this.recipeList);
  }

  async search(evt) {
    this.recipeList = await this.initializeItems();
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.recipeList = this.recipeList.filter(currentRecipe => {
      if (currentRecipe.title && searchTerm) {
        return (currentRecipe.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  kelogin(){
    this.router.navigate(['/login']);
  }

  toDetails(id: string){
    this.router.navigate(['/tabs/details-recipe-online', id]);
  }

}
