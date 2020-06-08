import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, public router:Router) { }

  ngOnInit() {
  }

  kelogin(){
    this.router.navigate(['/login']);
  }

}
