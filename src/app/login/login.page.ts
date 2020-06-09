import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private resepCol:AngularFirestoreCollection<User>;
  username:string;
  password:string;
  cariuser : User;
  cariuser2 : Observable<User>
  constructor(private route:Router,private fireStore:AngularFirestore) { 
    this.resepCol = this.fireStore.collection<User>('User');
  }

  ngOnInit() {
  }
  login(){
    // if(this.password != "" || this.username != ""){
    //   console.log(this.password);
    //   console.log(this.username);
    //   this.cariuser2 = this.getUser().valueChanges();
    //   this.cariuser2.subscribe(user =>{
    //     console.log(user);
    //     this.cariuser = user;
    //   })
    //   console.log(this.cariuser2);
    //   if(this.password === this.cariuser.password){
    //     this.route.navigate(['./pages/tabs/tabs.module#TabsPageModule']);
    //   }
    //   else{
    //     this.username = "";
    //     this.password = "";
    //     alert("Password or Username salah!");
    //   }
    // }
    // else{
    //   alert("Fill in the Form");
    // }
    this.route.navigate(['/tabs/home']);
  }
  signup(){
    this.route.navigate(['/signup']);
  }
  getUser() : AngularFirestoreDocument<User>{
    return this.fireStore.collection('User').doc(this.username);
  }
}
