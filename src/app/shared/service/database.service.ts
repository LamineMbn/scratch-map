import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Country} from '../model/country.class';

@Injectable()
export class DatabaseService {

  constructor(readonly _angularFirestore: AngularFirestore) { }

  get(uid): Observable<Country[]> {
    const countriesCollection: AngularFirestoreCollection<Country> = this._angularFirestore.collection(`/countries/${uid}`);
    return countriesCollection.valueChanges();
  }

}
