import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';


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
  loading: HTMLIonLoadingElement;
  constructor(
    private route:Router,
    private fireStore:AngularFirestore,
    private loadingController : LoadingController,
    private authService: AuthenticationService) { 
    this.resepCol = this.fireStore.collection<User>('User');
  }

  ngOnInit() {
  }
  login(){
    if(typeof(this.password) !== "undefined" && typeof(this.username) !== "undefined"){
      console.log(this.password);
      console.log(this.username);
      this.presentLoading();
      this.cariuser2 = this.getUser().valueChanges();
      this.cariuser2.subscribe(user =>{
        this.cariuser = user;
        this.loading.dismiss();
        if(typeof(this.cariuser2) === "undefined"){
          alert("Username tidak ditemukan");
        }
        else{
          if(this.password === this.cariuser.password){
            this.authService.login(this.username);
            this.route.navigate(['/tabs/home']);
          }
          else{
            this.username = "";
            this.password = "";
            alert("Password or Username salah!");
          }
        }
      });
    }
    else{
      alert("Fill in the Form");
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Logging in...'
    });
    return this.loading.present();
  }

  signup(){
    this.route.navigate(['/signup']);
  }
  
  getUser() : AngularFirestoreDocument<User>{
    return this.fireStore.collection('User').doc(this.username);
  }
}
