import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WishList } from '../entities/wish-list';
import { AngularFirestore } from 'angularfire2/firestore';
import { forEach } from '@angular/router/src/utils/collection';
import { Wish } from '../entities/wish';

@Injectable()
export class WishlistService {
  whislists: WishList[];
  constructor(private afs: AngularFirestore) {
  }

  getWishLists(uid: string): Observable<any> {

     return this.afs.collection
      ('wishlist', ref => ref.where('owner', '==', uid)).valueChanges();
  }
}
