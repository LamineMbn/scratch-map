import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

@Injectable()
export class CountriesApiService {

  readonly BASE_URL: string = 'https://restcountries.eu/rest/v2';

  constructor(readonly _httpClient: HttpClient) {
  }

  public getCountriesByFields(fields: string[]): Observable<any> {
    let params = new HttpParams()
      .set('fields', _.join(fields, ';'));

    let url = this.BASE_URL + '/all';

    return this._httpClient.get(url, {params: params});
  }

  public retrieveAllCountriesInformation(): Observable<any> {
    let url = this.BASE_URL + '/all';
    return this._httpClient.get(url);
  }

}
