import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { ActionSheetController, Platform } from '@ionic/angular';
import { Category } from "src/app/models/category.model";
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';



@Component({
  selector: "app-category",
  templateUrl: "./category.page.html",
  styleUrls: ["./category.page.scss"],
})
export class CategoryPage implements OnInit {
  private categoryCloud: Observable<Category[]>;
  private categoryColumn: AngularFirestoreCollection<Category>;
  public categoryList = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private actionSheetController: ActionSheetController,
    private plt: Platform,
    private fireStore: AngularFirestore,
  ) {
    this.categoryColumn = this.fireStore.collection<Category>('Category');
  }

  async initializeItems(): Promise<any> {
    const foodList = await this.fireStore.collection('Category')
      .valueChanges().pipe(first()).toPromise();
    return foodList;
  }

  async ngOnInit() {
    this.categoryList = await this.initializeItems();
  }

  async ionViewWillEnter() {
    this.categoryList = await this.initializeItems();
  }

  async search(evt) {
    this.categoryList = await this.initializeItems();
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.categoryList = this.categoryList.filter(currentCategory => {
      if (currentCategory.title && searchTerm) {
        return (currentCategory.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }
}
