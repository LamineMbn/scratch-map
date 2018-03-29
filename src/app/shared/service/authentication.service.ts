import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';

// import {User} from '../model/user.class';

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

@Injectable()
export class AuthenticationService {

  user: Observable<User>;

  constructor(readonly _angularFireAuth: AngularFireAuth, readonly _angularFirestore: AngularFirestore, readonly router: Router) {
    this.user = this._angularFireAuth.authState
      .switchMap(user => {
        if (user) {
          return this._angularFirestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });

  }

  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider).then(() => this.router.navigate(['/']));
  }

  logout() {
    this._angularFireAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  private oAuthLogin(provider) {
    return this._angularFireAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this._angularFirestore.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, {merge: true});

  }


  getAuth(callback) {
    firebase.auth().onAuthStateChanged(callback);
  }

}
