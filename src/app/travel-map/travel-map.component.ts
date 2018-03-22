import { Component, OnInit } from '@angular/core';
import { AmChart, AmChartsService } from '@amcharts/amcharts3-angular';
import { MatSelectChange } from '@angular/material';

import * as _ from 'lodash';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import { CountriesApiService } from '../service/countries-api.service';

@Component({
  selector: 'app-travel-map',
  templateUrl: './travel-map.component.html',
  styleUrls: ['./travel-map.component.scss']
})
export class TravelMapComponent implements OnInit {
  countryCtrl: FormControl;
  filteredCountries: Observable<any[]>;
  countries = [];
  projections = [
    {value: 'miller', viewValue: 'miller'},
    {value: 'eckert5', viewValue: 'Eckert 5'},
    {value: 'eckert6', viewValue: 'Eckert 6'}
  ];


  selectedCountries = new Array<string>('DZ', 'CN');
  map: AmChart;

  constructor(private _countriesApiService: CountriesApiService,
              private _amChartsService: AmChartsService) {
  }

  ngOnInit(): void {

    this.countryCtrl = new FormControl();
    this._countriesApiService.getCountriesByFields(['name', 'nativeName', 'alpha2Code', 'flag']).subscribe(countries => {
      this.countries = countries;
    });

    this.filteredCountries = this.countryCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.filterCountries(state) : this.countries.slice())
      );

    this.map = this.createMap('mapdiv');
    this.addListeners();

  }

  private createMap(placeHolder: string): AmChart {
    return this._amChartsService.makeChart(placeHolder, {
      /**
       * this tells amCharts it's a map
       */
      type: 'map',
      theme: 'light',
      fontSize: 15,
      color: '#FFFFFF',
      projection: 'miller',
      /*backgroundAlpha: 1,
      backgroundColor: 'rgba(80,80,80,1)',*/

      /**
       * create data provider object
       * map property is usually the same as the name of the map file.
       * getAreasFromMap indicates that amMap should read all the areas available
       * in the map data and treat them as they are included in your data provider.
       * in case you don't set it to true, all the areas except listed in data
       * provider will be treated as unlisted.
       */
      dataProvider: {
        map: 'worldHigh',
        getAreasFromMap: true
      },

      /**
       * create areas settings
       * autoZoom set to true means that the map will zoom-in when clicked on the area
       * selectedColor indicates color of the clicked area.
       */
      areasSettings: {
        selectable: true,
        autoZoom: false,
        color: '#CDCDCD',
        colorSolid: '#5EB7DE',
        selectedColor: '#5EB7DE',
        outlineColor: '#666666',
        rollOverColor: '#88CAE7',
        rollOverOutlineColor: '#FFFFFF'
      }
    });
  }

  private addListeners() {

    this._amChartsService.addListener(this.map, 'init', () => {
      this.selectCountries(this.selectedCountries);
    });

    this._amChartsService.addListener(this.map, 'clickMapObject', (event) => {
      this.fireCountrySelectionEvent(event);
    });
  }

  changeProjection(event: MatSelectChange){
    let projection = event.value;
    this.map.setProjection(projection);
  }

  async selectC(countrySelected){
    this.selectedCountries = countrySelected;
  }

  private selectCountries(list: string[]) {
    console.log(list)
    let map = this.map;
    _.forEach(list, function (countryCode) {
      let area = map.getObjectById(countryCode);
      area.showAsSelected = true;
      map.returnInitialColor(area);
    })
    this.countryCtrl.reset();
    this.selectedCountries = this.retrieveSelectedCountries(map);
  }

  private fireCountrySelectionEvent(event) {
    let area = event.mapObject;
    area.showAsSelected = !area.showAsSelected;
    event.chart.returnInitialColor(area);
    this.updateCountryList();
  }

  private updateCountryList(): void {
    this.selectedCountries = this.retrieveSelectedCountries(this.map);
  }

  private retrieveSelectedCountries(map: AmChart): Array<string> {
    var selected = [];
    _.forEach(map.dataProvider.areas, function (area) {
      if (area.showAsSelected) {
        selected.push(`${area.id} (${area.title})`);
      }
    })
    return selected;
  }

  private filterCountries(name: string) {
    return this.countries.filter(country =>
      country.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

}
