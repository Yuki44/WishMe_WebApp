import { User } from './../../shared/entities/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable, Directive } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  constructor(private fireAuth: AngularFireAuth) {}

  login(email: string, password: string): Promise<any> {
    return this.fireAuth.auth.signInAndRetrieveDataWithEmailAndPassword(
      email,
      password
    );
  }

  logout(): Promise<any> {
    return this.fireAuth.auth.signOut();
  }

  signup(user: User): Promise<any> {
    return this.fireAuth.auth
      .createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password)
      .then(function() {
        console.log('OTO uid ', user.uid);
      });
  }

  signUpUser(user: User) {
    this.fireAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .catch(function(error) {
        console.log(error);
      });
  }

  getAuthUser(): Observable<User> {
    return this.fireAuth.authState.map(authState => {
      if (!authState) {
        return null;
      }
      console.log('auth.service/getAuthUser(): ' + authState.uid);
      return { email: authState.email, uid: authState.uid };
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.fireAuth.authState.map(authState => {
      return authState !== null;
    });
  }
}
