import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../user.module';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(public route:Router,public fireStore:AngularFirestore) { }
  username:string;
  nama:string;
  password:string;
  add:user;
  user:string;
  private resepcol:AngularFirestoreCollection<user>;
  ngOnInit() {
  }
  cancel(){
    this.route.navigate(['/login']);
  }
  signup(){
    this.resepcol=this.fireStore.collection<user>('User');
    this.add={
      username: this.username,
      password:this.password,
      nama:this.nama,
      id_download:"a1",
      id_bookmark:"b1"
    }
    this.resepcol.doc(this.add.username).set(this.add);
    this.username="";
    this.password="";
    this.nama="";
  }
}
