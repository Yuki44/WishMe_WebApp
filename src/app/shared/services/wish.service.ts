import { Injectable } from '@angular/core';
import { Wish } from '../entities/wish';
import {Observable} from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { WishList } from '../entities/wish-list';

@Injectable()
export class WishService {
  // wishes: WishesList[];

  constructor(private afs: AngularFirestore) { }

getWishes(uid: string): Observable<any> {

    let ref =  this.afs.collection
    ('wish', ref => ref.where('owner', '==', uid));
    debugger;
  return ref.snapshotChanges().map( actions => {
    return actions.map( a => {
      const data = a.payload.doc.data() as Wish;
      data.id = a.payload.doc.id;
      return data;
    })
  });
}
addWish(){



    // TODO
}

deleteWish(){
  // TODO
}

updateWish(){
  // TODO
}



}
