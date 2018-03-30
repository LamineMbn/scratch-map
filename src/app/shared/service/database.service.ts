import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Country} from '../model/country.class';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DatabaseService {

  constructor(readonly _angularFirestore: AngularFirestore) {
  }

  getCountries(uid): Observable<any> {
    const countriesCollection: AngularFirestoreDocument<Country[]> = this._angularFirestore.doc(`/countries/${uid}`);
    return countriesCollection.valueChanges();
  }

  addCountry(uid: string, country: any[]) {
    // const country = new Country(uid, code);
    const countryData = {
      code: country
    }
    console.log(`uid = ${uid}`);
    const countriesPath = `/countries/${uid}`;

    return this._angularFirestore.doc(countriesPath).set(countryData);
  }

}
