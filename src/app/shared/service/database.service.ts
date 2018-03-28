import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Country } from '../model/country.class';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseService {

  constructor(readonly _angularFirestore: AngularFirestore) {
  }

  // get(uid): Observable<Country[]> {
  //   const countriesCollection: AngularFirestoreCollection<Country> = this._angularFirestore.collection(`/countries/${uid}`);
  //   return countriesCollection.valueChanges();
  // }

  getCountries(): Observable<Country[]> {
    const countriesCollection: AngularFirestoreCollection<Country> = this._angularFirestore.collection(`/countries`);
    return countriesCollection.valueChanges();
  }


}
