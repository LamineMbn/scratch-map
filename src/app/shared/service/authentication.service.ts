import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {User} from '../model/user.class';

@Injectable()
export class AuthenticationService {

  authState: any = null;

  constructor(readonly _angularFireAuth: AngularFireAuth, readonly router: Router) {
  }


  getAuth(callback) {
    firebase.auth().onAuthStateChanged(callback);
  }

  async login() {

    try {
      let result = await this._angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

      let user = new User(
        result.user.displayName,
        result.user.email,
        result.user.photoURL
      );

      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['']);
    } catch (e) {
      console.error('Problem occurred with login');
      console.error(e);
    }

  }

  logout() {
    this._angularFireAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }

  getLoggedUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}') as User;
  }

  isLoggedIn(): boolean {
    return this.getLoggedUser() !== null;
  }

}
