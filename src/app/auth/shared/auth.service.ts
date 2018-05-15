import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  public login (email: string, password: string): Promise<any> {
    return this.fireAuth.auth.signInAndRetrieveDataWithEmailAndPassword(
      email, password
    );
  }

}
