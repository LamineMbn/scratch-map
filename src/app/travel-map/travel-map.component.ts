import {Component, OnInit} from '@angular/core';
import {AmChart, AmChartsService} from '@amcharts/amcharts3-angular';
import {MapManipulationService} from '../shared/service/map-manipulation.service';

@Component({
  selector: 'app-travel-map',
  templateUrl: './travel-map.component.html',
  styleUrls: ['./travel-map.component.scss']
})
export class TravelMapComponent implements OnInit {
  selectedCountries = new Array<string>('DZ', 'CN');
  map: AmChart;

  constructor(readonly _amChartsService: AmChartsService,
              readonly _mapService: MapManipulationService) {
  }

  ngOnInit(): void {
    this.map = this.createMap('mapdiv');
    this.addListeners();
  }

  updateProjection(projectionSelected) {
    this.map.setProjection(projectionSelected);
  }

  async updateCountrySelection(countrySelected) {
    this.selectedCountries = countrySelected;
    console.log(this.selectedCountries.length);
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

  private fireCountrySelectionEvent(event) {
    let area = event.mapObject;
    area.showAsSelected = !area.showAsSelected;
    event.chart.returnInitialColor(area);
    this.updateCountryList();
  }

  private updateCountryList(): void {
    this.selectedCountries = this.retrieveSelectedCountries(this.map);
    console.log(this.selectedCountries.length);
  }

  private selectCountries(list: string[]) {
    let map = this._mapService.updateMapWithCountrySelection(this.map, list);
    this.selectedCountries = this.retrieveSelectedCountries(map);
  }

  private retrieveSelectedCountries(map: AmChart): Array<string> {
    return this._mapService.retrieveSelectedCountries(map);
  }

}
