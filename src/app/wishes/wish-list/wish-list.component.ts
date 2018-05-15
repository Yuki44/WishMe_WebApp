import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  addWish() {
    this.route.navigateByUrl('/addwish');
  }
}
