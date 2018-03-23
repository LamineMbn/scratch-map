import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import { CountriesApiService } from '../shared/service/countries-api.service';
import { AmChart } from '@amcharts/amcharts3-angular';
import { FormControl } from '@angular/forms';
import { MapManipulationService } from '../shared/service/map-manipulation.service';
import {Country} from '../shared/model/ICountry';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss']
})
export class CountrySelectComponent implements OnInit {

  @Input() map: AmChart;
  @Output() selectedCountries: EventEmitter<string[]>;

  countryCtrl: FormControl;
  filteredCountries: Observable<any[]>;
  countries = new Array<Country>();

  constructor(readonly _countriesApiService: CountriesApiService,
              readonly _mapService: MapManipulationService) {
    this.selectedCountries = new EventEmitter<string[]>();
  }

  ngOnInit() {

    this.countryCtrl = new FormControl();

    this._countriesApiService.getCountriesByFields(['name', 'nativeName', 'alpha2Code', 'flag']).subscribe(countries => {
      this.countries = countries;
    });

    this.filteredCountries = this.countryCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.filterCountries(state) : this.countries.slice())
      );
  }

  selectCountries(list: string[]) {
    const iMap = this._mapService.updateMapWithCountrySelection(this.map, list);
    this.countryCtrl.reset();
    this.selectedCountries.emit(this.retrieveSelectedCountries(iMap));
  }

  retrieveSelectedCountries(pMap: AmChart): Array<string> {
    return this._mapService.retrieveSelectedCountries(pMap);
  }

  filterCountries(name: string) {
    return this.countries.filter(country =>
      country.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }


}
