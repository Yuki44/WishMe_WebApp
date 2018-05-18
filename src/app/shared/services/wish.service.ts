import { Injectable } from '@angular/core';
import { Wish } from '../entities/wish';
import {Observable} from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { WishList } from '../entities/wish-list';
import { FileStorageService } from '../storage/file-storage.service';

@Injectable()
export class WishService {

  constructor(private fileStorageService: FileStorageService,
              private afs: AngularFirestore) { }

getWishes(uid: string): Observable<any> {

    let ref =  this.afs.collection
    ('wish', ref => ref.where('owner', '==', uid));
  return ref.snapshotChanges().map( actions => {
    return actions.map( a => {
      const data = a.payload.doc.data() as Wish;
      data.id = a.payload.doc.id;
      this.fileStorageService.downloadUrlWish(data.id).subscribe(url =>{
        data.imageUrl = url ;
        console.log(data);
      } );
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
