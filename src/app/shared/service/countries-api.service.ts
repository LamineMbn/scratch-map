import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';
import {Country} from '../model/ICountry';

@Injectable()
export class CountriesApiService {

  readonly BASE_URL: string = 'https://restcountries.eu/rest/v2';

  constructor(readonly _httpClient: HttpClient) {
  }

  getCountriesByFields(fields: string[]): Observable<Country[]> {
    const params = new HttpParams()
      .set('fields', _.join(fields, ';'));

    const url = this.BASE_URL + '/all';

    return this._httpClient.get<Country[]>(url, {params: params});
  }

  retrieveAllCountriesInformation(): Observable<Country[]> {
    const url = this.BASE_URL + '/all';
    return this._httpClient.get<Country[]>(url);
  }

}
