import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookmarkedRecipe } from 'src/app/models/bookmarked_recipe.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-bookmark-recipes',
  templateUrl: './bookmark-recipes.page.html',
  styleUrls: ['./bookmark-recipes.page.scss'],
})
export class BookmarkRecipesPage implements OnInit {
  private bookmark:Observable<BookmarkedRecipe>;
  private bookCol:AngularFirestoreCollection<BookmarkedRecipe>;
  allbook:BookmarkedRecipe[]; 
  iduser:string;
  idrecipe=[];
  allresep=[];
  constructor(public router:Router,
    private firestore:AngularFirestore,
    private storage: Storage){
      var data;
      this.bookCol=this.firestore.collection<BookmarkedRecipe>('Bookmark');
      this.storage.get('auth-token').then(async val=>{
        this.iduser=val;
        this.firestore.collection<BookmarkedRecipe>('Bookmark',ref=>ref.where('id_user','==',this.iduser)).valueChanges().subscribe(val =>{
            console.log(val);
            this.allbook=val;
            console.log(this.allbook.length);
            for(var i=0;i<this.allbook.length;i++ ){
              console.log(this.allbook[i].id_recipe);
              this.idrecipe.push(this.allbook[i].id_recipe);
            }
            console.log(this.idrecipe);
            for(var j=0;j<this.idrecipe.length;j++){
              this.firestore.collection<Recipe>('Recipes',ref=>ref.where('id','==',this.idrecipe[j])).valueChanges().subscribe(val=>{
                console.log(val);
                this.allresep.push(val[0]);
                console.log(this.allresep);        
              })
            }
          });
      });
  
     
  }

  ngOnInit() {
  }
  detail(idresep:string){
    console.log(idresep);
    this.router.navigate(['/tabs/details-recipe-online',idresep]);
  }
}
