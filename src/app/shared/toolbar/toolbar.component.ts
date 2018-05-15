import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  isLoggedIn: boolean;
  constructor(private route: Router) {
    this.isLoggedIn = false;
  }

  ngOnInit() {
  }

  login() {
    this.route.navigateByUrl('/login');
  }
  home() {
    this.route.navigateByUrl('/');
  }

  logout(){

  }

}
