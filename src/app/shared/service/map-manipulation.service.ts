import { Injectable } from '@angular/core';
import { AmChart } from '@amcharts/amcharts3-angular';

import * as _ from 'lodash';

@Injectable()
export class MapManipulationService {

  constructor() {
  }

  public retrieveSelectedCountries(map: AmChart): Array<string> {
    var selected = [];
    _.forEach(map.dataProvider.areas, function (area) {
      if (area.showAsSelected) {
        selected.push(`${area.id} (${area.title})`);
      }
    })
    return selected;
  }

  public updateMapWithCountrySelection(amMap: AmChart, list: string[]): AmChart {
    let map = amMap;
    _.forEach(list, function (countryCode) {
      let area = map.getObjectById(countryCode);
      area.showAsSelected = true;
      map.returnInitialColor(area);
    });
    return map;
  }

}
