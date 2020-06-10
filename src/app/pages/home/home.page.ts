import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  files = [];
  constructor(
    private activatedRoute: ActivatedRoute, 
    public router:Router,
    private actionSheetController: ActionSheetController,
    private plt: Platform
  ) {}
 
  ngOnInit() {
    
  }
  kelogin(){
    this.router.navigate(['/login']);
  }

}
