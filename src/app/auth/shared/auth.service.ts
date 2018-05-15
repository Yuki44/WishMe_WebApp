import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../shared/entities/user';

@Injectable()
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  public login (email: string, password: string): Promise<any> {
    return this.fireAuth.auth.signInAndRetrieveDataWithEmailAndPassword(
      email, password
    );
  }

  logout(): Promise<any> {
    return this.fireAuth.auth.signOut();
  }

  signup(user: User): Promise<any> {
    //
    return this.fireAuth.auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );

 }

  isAuthenticated(): Observable<boolean> {
    return this.fireAuth.authState
      .map(authState => {
        return authState !== null;
      });
  }

  getAuthUser(): Observable<User> {
    return this.fireAuth.authState
      .map(authState => {
        if (!authState) {
          return null;
        }
        console.log('USER ID   :' + authState.uid);
        return {email: authState.email, uid: authState.uid };
      });
  }
}
