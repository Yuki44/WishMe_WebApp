import { Injectable } from '@angular/core';
import { Wish } from '../entities/wish';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WishService {
  // wishes: WishesList[];

  constructor() { }

getWishes(uid: string): Observable<any> {
    // TODO
    return null;
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
