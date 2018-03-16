import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AmChart, AmChartsService} from '@amcharts/amcharts3-angular';

import * as _ from 'lodash';
import * as countries from 'country-list';

// var countries = require('country-list')();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  selectedCountries = new Array<string>();
  @Output() lastPrice = new EventEmitter();
  map: AmChart;
  that = this;


  constructor(private _amChartsService: AmChartsService) {
  }


  ngOnInit(): void {
    console.log(countries.getNames()[2]);
    this.map = this._amChartsService.makeChart('mapdiv', {
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
        /*color: 'rgba(129,129,129,1)',
        outlineColor: 'rgba(80,80,80,1)',
        rollOverOutlineColor: 'rgba(80,80,80,1)',*/
        selectable: true,
        autoZoom: false,
        selectedColor: '#CC0000',
        // rollOverBrightness: 20,
        // selectedBrightness: 20
      },
    });

    this._amChartsService.addListener(this.map, "clickMapObject", (event) => {
      this.fireCountrySelectionEvent(event);
    });

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

  private retrieveSelectedCountries(map: AmChart) : Array<string> {
    var selected = [];
    _.forEach(map.dataProvider.areas, function (area) {
      if (area.showAsSelected) {
        selected.push(`${area.id} (${area.title})`);
      }
    })
    return selected;
  }
}
