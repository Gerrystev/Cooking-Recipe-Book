import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username:string;
  password:string;
  constructor(private route:Router) { }

  ngOnInit() {
  }
  login(){
    this.route.navigate(['/folder',"Inbox"]);
  }
  signup(){
    this.route.navigate(['/signup']);
  }
}
