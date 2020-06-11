import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(public route:Router,public fireStore:AngularFirestore) { }
  username:string;
  email:string;
  password:string;
  date:Date;
  add:User;
  user:string;
  private resepcol:AngularFirestoreCollection<User>;
  ngOnInit() {
  }
  cancel(){
    this.route.navigate(['/login']);
  }
  signup(){
    if(typeof(this.username) === "undefined" || typeof(this.password) === "undefined" || typeof(this.date) === "undefined" || typeof(this.email) === "undefined"){
      alert("Fill in the Form");
    }
    else{
      this.resepcol=this.fireStore.collection<User>('User');
      this.add={
        username: this.username,
        password:this.password,
        email:this.email,
        birthdate:this.date,
      }
      this.resepcol.doc(this.add.username).set(this.add);
      this.username="";
      this.password="";
      this.email="";
      this.date=null;
    }
  }
}
