import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wishlist-list',
  templateUrl: './wishlist-list.component.html',
  styleUrls: ['./wishlist-list.component.css']
})
export class WishlistListComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
  goToWishes(){
    this.route.navigateByUrl('/wishes');
  }
}
