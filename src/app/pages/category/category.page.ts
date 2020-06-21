import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { ActionSheetController, Platform } from "@ionic/angular";
import { Category } from "src/app/models/category.model";
import { Recipe } from "src/app/models/recipe.model";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
  selector: "app-category",
  templateUrl: "./category.page.html",
  styleUrls: ["./category.page.scss"],
})
export class CategoryPage implements OnInit {
  private categoryCloud: Observable<Category[]>;
  private categoryColumn: AngularFirestoreCollection<Category>;
  public categoryList = [];
  private recipeCloud: Observable<Recipe[]>;
  private recipeColumn: AngularFirestoreCollection<Recipe>;
  public recipeList = [];
  showCat: boolean;
  showRec: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private actionSheetController: ActionSheetController,
    private plt: Platform,
    private fireStore: AngularFirestore
  ) {
    this.categoryColumn = this.fireStore.collection<Category>("Category");
    this.recipeColumn = this.fireStore.collection<Recipe>("Recipes");
  }

  async initializeItems(): Promise<any> {
    const foodList = await this.fireStore
      .collection("Category")
      .valueChanges()
      .pipe(first())
      .toPromise();
    return foodList;
  }

  async initializeRecipe(): Promise<any> {
    const foodList = await this.fireStore
      .collection("Recipes")
      .valueChanges()
      .pipe(first())
      .toPromise();
    return foodList;
  }

  async ngOnInit() {
    this.categoryList = await this.initializeItems();
    this.recipeList = await this.initializeRecipe();
    this.showCat = true;
    this.showRec = false;
  }

  async ionViewWillEnter() {
    this.categoryList = await this.initializeItems();
  }

  async search(evt) {
    this.showCat = true;
    this.showRec = false;
    this.categoryList = await this.initializeItems();
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.categoryList = this.categoryList.filter((currentCategory) => {
      if (currentCategory.title && searchTerm) {
        return (
          currentCategory.title
            .toLowerCase()
            .indexOf(searchTerm.toLowerCase()) > -1
        );
      }
    });
  }

  async searchRecipe(id: string) {
    this.recipeList = await this.initializeRecipe();

    this.showCat = false;
    this.showRec = true;

    var tempArray = [];

    for (let i = 0; i < this.recipeList.length; i++) {
      if (this.recipeList[i].id_category === id) {
        tempArray.push(this.recipeList[i]);
      }
    }

    this.recipeList = tempArray;
  }

  toDetails(id: string) {
    this.router.navigate(["/tabs/details-recipe-online", id]);
  }
}
