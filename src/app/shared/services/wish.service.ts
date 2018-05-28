import { Injectable } from '@angular/core';
import { Wish } from '../entities/wish';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { FileStorageService } from '../storage/file-storage.service';

@Injectable()
export class WishService {
  constructor(
    private fileStorageService: FileStorageService,
    private afs: AngularFirestore
  ) {}

  getWishes(uid: string, limit: number): Observable<any> {
    const ref = this.afs.collection('wish', ref =>
      ref.where('owner', '==', uid).limit(limit)
    );
    return ref.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Wish;
        data.id = a.payload.doc.id;
        try {
          this.fileStorageService.downloadUrlWish(data.id).subscribe(url => {
            data.imageUrl = url;
            console.log(data);
          });
        } catch {
          console.log('something went wrong');
        }

        if (data.imageUrl == null) {
          data.imageUrl = 'assets/giftdefault.jpg';
        }
        return data;
      });
    });
  }

  getWishWithImageUrl(uid: string): Observable<any> {
    return this.afs
      .collection('wish')
      .doc(uid)
      .snapshotChanges()
      .map(actions => {
        const data = actions.payload.data() as Wish;
        try {
          this.fileStorageService.downloadUrlWish(data.id).subscribe(url => {
            data.imageUrl = url;
          });
        } catch {
          console.log('something went wrong');
        }

        if (data.imageUrl == null) {
          data.imageUrl = 'assets/giftdefault.jpg';
        }

        return data;
      });
  }

  createWish(wish: Wish, owner: string): Promise<any> {
    if (wish != null) {
      console.log('wish in serivce:' + wish);
      const collection = this.afs.collection<any>('wish');
      return collection.add({
        description: wish.description,
        link: wish.link,
        name: wish.name,
        owner: owner,
        price: wish.price,
        rating: wish.rating
      });
    } else {
      return new Promise((resolve, reject) => {
        reject('Value is not a valid');
      });
    }
  }

  deleteWish(w: Wish): Promise<any> {
    return this.afs
      .collection('wish')
      .doc(w.id)
      .delete();
  }

  updateWish(w: Wish): Promise<any> {
    return this.afs
      .collection('wish')
      .doc(w.id)
      .update({
        description: w.description,
        link: w.link,
        name: w.name,
        owner: w.owner,
        price: w.price,
        rating: w.rating
      });
  }
}
