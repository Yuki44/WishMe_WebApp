import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../../shared/entities/user';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { FileStorageService } from '../../shared/storage/file-storage.service';

@Injectable()
export class UserService {

  constructor(private authService: AuthService,
              private fileStorageService: FileStorageService,
              private afs: AngularFirestore) { }


  getUser(): Observable<User> {
    return this.authService.getAuthUser()
      .switchMap(authUser => {
        if (!authUser) {
          return new EmptyObservable();
        }
        return this.afs.doc<User>('users/' + authUser.uid).valueChanges()
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
    return this.getUser()
      .switchMap(user => {
        if (!user) {
          return Observable.create(obs => {
            obs.next(user);
          });
        }
        return this.fileStorageService.downloadUrlProfile(user.uid)
          .map(url => {
            user.profileImgUrl = url;
            return user;
          });
      });
  }

  updateUser(user: User): Promise<any> {
    return this.afs.doc('users/' + user.uid).set(user);
  }

}
