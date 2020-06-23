import { Component, OnInit } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Recipe } from "../../models/recipe.model";
import { Category } from "../../models/category.model";
import { Ingredient } from "../../models/ingredient.model";
import { Direction } from "../../models/direction.model";
import { AngularFireStorage } from "@angular/fire/storage";
import { LoadingController } from "@ionic/angular";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: "app-upload-recipe",
  templateUrl: "./upload-recipe.page.html",
  styleUrls: ["./upload-recipe.page.scss"],
})
export class UploadRecipePage implements OnInit {
  recipeCloud: Observable<Recipe[]>;
  categoryCloud: Observable<Category[]>;
  private recipeColumn: AngularFirestoreCollection<Recipe>;
  private categoryColumn: AngularFirestoreCollection<Category>;
  private ingredientsColumn: AngularFirestoreCollection<Ingredient>;
  private directionsColumn: AngularFirestoreCollection<Direction>;

  selectedFile: any;
  loading: HTMLIonLoadingElement;
  img1: any;
  title: string;
  hours: string;
  minutes: string;
  description: string;
  category : string;
  ingredientsArray = [];
  directionsArray = [];

  // Comment
  myComment: string;
  constructor(
    private fireStore: AngularFirestore,
    private store: AngularFireStorage,
    private loadingController: LoadingController,
    private authService: AuthenticationService,
    private storage: Storage
  ) {
    this.recipeColumn = this.fireStore.collection<Recipe>("Recipes");
    this.categoryColumn = this.fireStore.collection<Category>("Category");
    this.recipeCloud = this.recipeColumn.valueChanges();
    this.categoryCloud = this.categoryColumn.valueChanges();
    this.ingredientsColumn = this.fireStore.collection<Ingredient>("Ingredients");
    this.directionsColumn = this.fireStore.collection<Direction>("Directions");
    this.ingredientsArray.push({ 'value': '' });
    this.directionsArray.push({ 'value': '' });
  }

  ngOnInit() { }

  add_ingredients_field() {
    this.ingredientsArray.push({ 'value': '' });
  }

  add_directions_field() {
    this.directionsArray.push({ 'value': '' });
  }

  upload_recipe() {
    if(typeof(this.img1)==="undefined" ||
      typeof(this.description) === "undefined" ||
      typeof(this.title)==="undefined"||
      typeof(this.category)==="undefined"||
      this.ingredientsArray === []||
      this.directionsArray === []||
      typeof(this.hours)==="undefined"||
      typeof(this.minutes)==="undefined"){
        alert("Fill in the Forms!");
    }
    else{
      var recipeId;
      let classIngredients = <HTMLCollectionOf<HTMLIonInputElement>>(
        document.getElementsByClassName("ingredients-field")
      );
      let classDirections = <HTMLCollectionOf<HTMLIonInputElement>>(
        document.getElementsByClassName("directions-field")
      );
  
      // Insert Recipe
      this.storage.get('auth-token').then(async val => {
        let tempRecipe = {
          id: "string",
          title: this.title,
          description: this.description,
          time_cook: this.hours + " Hours " + this.minutes + " Minutes",
          imageLink: "File",
          id_user: val,
          id_category: this.category,
        };
  
        this.recipeColumn.add(tempRecipe).then(async (resp) => {
          recipeId = resp.id;
          const imageUrl = await this.uploadFile(resp.id, this.selectedFile);
          this.recipeColumn
            .doc(resp.id)
            .update({
              id: resp.id,
              imageLink: imageUrl || null,
            })
            .catch((error) => {
              console.log(error);
            });
  
          // insert ingredients to firebase
          for (let i = 0; i < classIngredients.length; i++) {
            console.log("Ingredients : " + classIngredients[i].value);
  
            let tempIngredient = {
              id: "string",
              description: classIngredients[i].value,
              step: i,
              id_recipe: recipeId,
            };
            this.ingredientsColumn.add(tempIngredient).then((resp) => {
              this.ingredientsColumn
                .doc(resp.id)
                .update({
                  id: resp.id,
                })
                .catch((error) => {
                  console.log(error);
                });
            });
          }
  
          // Insert Directions to Firebase
          for (let i = 0; i < classDirections.length; i++) {
            console.log("Directions : " + classDirections[i].value);
  
            let tempDirection = {
              id: "string",
              description: classDirections[i].value,
              step: i,
              id_recipe: recipeId,
            };
            this.directionsColumn.add(tempDirection).then(async (resp) => {
              this.directionsColumn
                .doc(resp.id)
                .update({
                  id: resp.id,
                })
                .catch((error) => {
                  console.log(error);
                });
            });
          }
          location.reload();
        });
      });
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: "Please wait...",
    });
    return this.loading.present();
  }

  async uploadFile(id, file): Promise<any> {
    if (file && file.length) {
      try {
        this.presentLoading();
        const task = await this.store.ref("recipes").child(id).put(file[0]);
        this.loading.dismiss();
        return this.store.ref(`recipes/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }

  fileChange(event) {
    this.selectedFile = event.target.files;
      if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.img1 = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    console.log(file);
    } 
}
