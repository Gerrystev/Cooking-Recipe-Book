import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Recipe } from 'src/app/models/recipe.model';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Direction } from 'src/app/models/direction.model';
import { Category } from 'src/app/models/category.model';
import { BookmarkedRecipe } from 'src/app/models/bookmarked_recipe.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Comment } from 'src/app/models/comment.model';

enum COLORS {
  GREY = "#E0E0E0",
  GREEN = "#76FF03",
  YELLOW = "#FFCA28",
  RED = "#DD2C00"
}

@Component({
  selector: 'app-details-recipe-online',
  templateUrl: './details-recipe-online.page.html',
  styleUrls: ['./details-recipe-online.page.scss'],
})
export class DetailsRecipeOnlinePage implements OnInit {
  private resepCol: AngularFirestoreCollection<Recipe>;
  private commentCol: AngularFirestoreCollection<Comment>;
  id: string;
  idCategory: string;
  loading: HTMLIonLoadingElement;
  cariresep: Observable<Recipe>;
  detresep: Recipe;
  ingredients: Ingredient[];
  direct: Direction[];
  cariCategory: Observable<Category>;
  category: Category;
  book = 0;
  bmk: BookmarkedRecipe[];
  bookmark: BookmarkedRecipe;
  rating: number;
  idUser: string;
  comment: string;
  allComments: Comment[];
  buttonColor:string;
  private bookCol: AngularFirestoreCollection<BookmarkedRecipe>;
  constructor(public Activatedrouter: ActivatedRoute,
    public router: Router,
    public firestore: AngularFirestore,
    private authService: AuthenticationService,
    private storage: Storage,
    private loadingController: LoadingController,
    public navCtrl: NavController) {
    this.resepCol = this.firestore.collection<Recipe>('Resep');
    this.bookCol = this.firestore.collection<BookmarkedRecipe>('Bookmark');
    this.commentCol = this.firestore.collection<Comment>('Comments');
  }
  IonViewEnter() {
  }
  ngOnInit() {
    this.Activatedrouter.paramMap.subscribe(paramMap => {
      if (!paramMap.has('idrecipe')) {
        return;
      }
      this.id = paramMap.get('idrecipe');
      this.cariresep = this.getResep().valueChanges();
      this.cariresep.subscribe(isiResep => {
        // console.log(isiResep);
        this.detresep = isiResep;
        this.idCategory = isiResep.id_category;
        this.cariCategory = this.getCategory(this.idCategory).valueChanges();
        this.cariCategory.subscribe(isiCategory => {
          // console.log(isiCategory);
          this.category = isiCategory;
        })
      })

      this.firestore.collection<Ingredient>('Ingredients', ref => ref.where('id_recipe', '==', this.id)).valueChanges().subscribe(val => {
        // console.log(val);
        this.ingredients = val;
      });

      this.firestore.collection<Direction>('Directions', ref => ref.where('id_recipe', '==', this.id).orderBy('step')).valueChanges().subscribe(val => {
        // console.log(val);
        this.direct = val;
      });
      
      this.storage.get('auth-token').then(async data => {
        this.idUser = data;
        this.firestore.collection<BookmarkedRecipe>('Bookmark', ref => ref.where('id_user', '==', data).where('id_recipe', '==', this.id)).valueChanges()
          .subscribe(val => {
            if (typeof (val[0]) === "undefined") {
              this.book = 0;
            }
            else if (val[0].id_recipe === this.id) {
              // console.log(val[0].id_recipe);
              // console.log(this.id);
              this.book = 1;
            }
            if(this.book===0){
              this.buttonColor="heart-outline";
            }
            else{
              this.buttonColor="heart";
            }
          })
      })
    })
    this.refreshComments();

  }

  getResep(): AngularFirestoreDocument<Recipe> {
    return this.firestore.collection('Recipes').doc(this.id);
  }

  getCategory(idCategory: string): AngularFirestoreDocument<Category> {
    return this.firestore.collection('Category').doc(idCategory);
  }

  like() {
    this.presentLoading();
    // console.log(this.book);
    if (this.book === 0) {
      // console.log("tes");
      var bookID;
      this.storage.get('auth-token').then(async val => {
        let tempbook = {
          id: "string",
          id_recipe: this.id,
          id_user: val
        };
        this.bookCol.add(tempbook).then(async (book) => {
          bookID = book.id;
          // console.log(bookID);
          this.bookCol.doc(book.id).update({
            id: book.id
          })
            .catch((error) => {
              console.log(error);
            });
          this.loading.dismiss();
        });
      });
    }
    else {
      var userid, idbook;
      this.storage.get('auth-token').then(async val => {
        userid = val;
        this.firestore.collection<BookmarkedRecipe>('Bookmark', ref => ref.where('id_recipe', '==', this.id)
        .where('id_user', '==', userid)).valueChanges().subscribe(val => {
          this.bmk = val;
          idbook = this.bmk[0].id;
          if (typeof (idbook) === "undefined") {
            // console.log("Tidak terbookmarked");
          }
          else {
            this.bookCol.doc(idbook).delete();
            // alert("Unbookmarked");
          }
          this.loading.dismiss();
        });
      })
    }
    this.navCtrl.navigateRoot(['/tabs/details-recipe-online', this.id]);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: "Please wait...",
      duration: 5000,
      cssClass: 'my-custom'
    });
    return this.loading.present();
  }

  refreshComments(){
    this.firestore.collection<Comment>('Comments',ref=>ref.where('id_recipe','==',this.id)).valueChanges().subscribe(val =>{
      this.allComments = val
      console.log(this.allComments)
    });
  }

  post_comment(){
    let tempComment = {
      id : 'id',
      content : this.comment,
      rating : this.rating,
      id_user : this.idUser,
      id_recipe : this.id
    };

    this.commentCol.add(tempComment).then(async (resp) => {
      this.presentLoading();
      await this.commentCol.doc(resp.id).update({
        id: resp.id,
      })
      .catch((error) => {
        console.log(error);
      });
      this.loading.dismiss();

      this.refreshComments();
    });
  }

  arrayComment(n: number): any[] {
    return Array(n);
  }
  backButton(){
    this.router.navigate(['/tabs/home']);
  }
  edit(){
    alert("tes");
    this.router.navigate(['/edit',this.id])
  }
}
