import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../../shared/entities/user';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { FileStorageService } from '../../shared/storage/file-storage.service';

@Injectable()
export class UserService {
  constructor(
    private authService: AuthService,
    private fileStorageService: FileStorageService,
    private angularFireStore: AngularFirestore
  ) {}

  documentReference: AngularFirestoreDocument<User>;

  getUser(): Observable<User> {
    return this.authService.getAuthUser().switchMap(authUser => {
      if (!authUser) {
        return new EmptyObservable();
      }
      this.documentReference = this.angularFireStore.doc<User>(
        'users/' + authUser.uid
      );
      return this.angularFireStore
        .doc<User>('users/' + authUser.uid)
        .valueChanges()
        .map(dbUser => {
          if (dbUser) {
            authUser.name = dbUser.name;
            authUser.email = dbUser.email;
            authUser.contactEmail = dbUser.contactEmail;
            authUser.address = dbUser.address;
          }
          return authUser;
        });
    });
  }

  getUserWithProfileUrl(): Observable<User> {
    return this.getUser().switchMap(user => {
      if (!user) {
        return Observable.create(obs => {
          obs.next(user);
        });
      }
      return this.fileStorageService.downloadUrlProfile(user.uid).map(url => {
        user.profileImgUrl = url;
        return user;
      });
    });
  }

  createUserProfile(user: User): Promise<any> {
    return new Promise(() => {
      this.authService.getAuthUser().subscribe(authUser => {
        if (authUser && user != null) {
          const coll = this.angularFireStore
            .collection<User>('users')
            .doc(authUser.uid);
          coll.set({
            address: user.address,
            contactEmail: user.contactEmail,
            name: user.name,
            uid: authUser.uid
          });
        }
      });
    });
  }

  updateUser(user: User): Promise<any> {
    console.log('user.service/updateUser() ' + user.uid);
    return this.angularFireStore.doc('users/' + user.uid).set(user);
  }
}
