import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {CountriesApiService} from '../service/countries-api.service';
import {AmChart} from '@amcharts/amcharts3-angular';

import * as _ from 'lodash';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss']
})
export class CountrySelectComponent implements OnInit {

  @Input() map: AmChart;
  @Output() selectedCountries: EventEmitter<any[]>;

  filteredCountries: Observable<any[]>;
  countries = [];

  constructor(private _countriesApiService: CountriesApiService) { }

  ngOnInit() {

    this._countriesApiService.getCountriesByFields(['name', 'nativeName', 'alpha2Code', 'flag']).subscribe(countries => {
      this.countries = countries;
    });
  }

  private selectCountries(list: string[]) {
    console.log(list)
    let map = this.map;
    _.forEach(list, function (countryCode) {
      let area = map.getObjectById(countryCode);
      area.showAsSelected = true;
      map.returnInitialColor(area);
    })
    this.selectedCountries.emit(this.retrieveSelectedCountries(map));
  }

  private retrieveSelectedCountries(map: AmChart): Array<string> {
    let selected = [];
    _.forEach(map.dataProvider.areas, function (area) {
      if (area.showAsSelected) {
        selected.push(`${area.id} (${area.title})`);
      }
    })
    return selected;
  }

}
