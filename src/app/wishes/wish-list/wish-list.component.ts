import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  descriptionVisible: boolean;

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
