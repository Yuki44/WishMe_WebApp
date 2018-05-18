import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WishList } from '../../shared/entities/wish-list';
import { Wish } from '../../shared/entities/wish';
import { WishService } from '../../shared/services/wish.service';
import 'rxjs/operator/switchMap';
@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  descriptionVisible: boolean;
  wishList: WishList;
  wishes: Wish[];


  constructor(private route: Router,
              private aRoute: ActivatedRoute,
              private wishService: WishService) { }

  toggleDescription(){
    if(this.descriptionVisible){
      this.descriptionVisible = false;
    } else {
      this.descriptionVisible = true;
    }
  }

  ngOnInit() {
    this.aRoute.paramMap
      .switchMap(params => this.wishService.getWishes(params.get('id')))
      .subscribe(wishes => this.wishes = wishes);
  }


  addWish() {
    this.route.navigateByUrl('/createwish');
  }
}
