import { Injectable } from '@angular/core';
import { AmChart } from '@amcharts/amcharts3-angular';

import * as _ from 'lodash';
import {DatabaseService} from './database.service';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class MapManipulationService {

  constructor(readonly _databaseService: DatabaseService, readonly _authenticationService: AuthenticationService) {
  }

  public retrieveSelectedCountries(map: AmChart): Array<string> {
    const selected = [];
    _.forEach(map.dataProvider.areas, function (area) {
      if (area.showAsSelected) {
        selected.push(`${area.id} (${area.title})`);
      }
    })
    return selected;
  }

  public updateMapWithCountrySelection(amMap: AmChart, list: string[]): AmChart {
    const map = amMap;
    const uid = this._authenticationService.user.map(user => user.uid);
    console.log(uid);
    _.forEach(list, function (countryCode) {
      const area = map.getObjectById(countryCode);
      area.showAsSelected = true;
      map.returnInitialColor(area);
      this._databaseService.addCountry(uid, countryCode);
    });
    return map;
  }

}
