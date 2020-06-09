import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-recipe',
  templateUrl: './upload-recipe.page.html',
  styleUrls: ['./upload-recipe.page.scss'],
})
export class UploadRecipePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  add_ingredients_field(){
    let markup = "<ion-row><ion-col><ion-input class=\"ingredients-field\" placeholder=\"1kg Sugar\"></ion-input></ion-col></ion-row>";
    document.getElementById("ingredients-section").outerHTML += markup;
    console.log(document.getElementById("ingredients-section"));
  }
  
  add_directions_field(){
    let markup = "<ion-row><ion-col><ion-input class=\"ingredients-field\" placeholder=\"Boil the water for 10 minutes\"></ion-input></ion-col></ion-row>";
    document.getElementById("directions-section").outerHTML += markup;
  }
}
