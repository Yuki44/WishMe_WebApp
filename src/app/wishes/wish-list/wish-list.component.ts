import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WishList } from '../../shared/entities/wish-list';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  descriptionVisible: boolean;
  wishList: WishList;


  constructor(private route: Router) { }

  toggleDescription(){
    if(this.descriptionVisible){
      this.descriptionVisible = false;
    } else {
      this.descriptionVisible = true;
    }
  }

  ngOnInit() {
  }

  addWish() {
    this.route.navigateByUrl('/addwish');
  }
}
