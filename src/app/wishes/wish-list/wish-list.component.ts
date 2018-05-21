import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WishList } from '../../shared/entities/wish-list';
import { Wish } from '../../shared/entities/wish';
import { WishService } from '../../shared/services/wish.service';
import 'rxjs/operator/switchMap';
import { WishDeleteComponent } from '../wish-delete/wish-delete.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteWishlistComponent } from '../../home/delete-wishlist/delete-wishlist.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  descriptionVisible: boolean;
  wishList: WishList;
  wishes: Wish[];
  wish: Wish;
  deleteWishRef: MatDialogRef<WishDeleteComponent>;



  constructor(private route: Router,
              private aRoute: ActivatedRoute,
              private wishService: WishService,
              private dialog: MatDialog) { }

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

  deleteWish(w: Wish){
    this.wish = new Wish();
    this.deleteWishRef = this.dialog.open(WishDeleteComponent, {
      hasBackdrop: false,
      data: {
        name: this.wish ? w.name : '',
      }
    });
    this.deleteWishRef.afterClosed()
      .pipe(filter(name => name))
      .subscribe(wish => {
        this.wishService.deleteWish(w);
      });
  }
}
