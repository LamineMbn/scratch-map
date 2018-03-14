import { Component, OnInit } from '@angular/core';
import { AmChartsService } from '@amcharts/amcharts3-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';


  constructor(readonly _amCharts: AmChartsService) {
  }


  ngOnInit(): void {
    this._amCharts.makeChart('mapdiv', {
      /**
       * this tells amCharts it's a map
       */
      type: 'map',
      fontSize: 15,
      color: '#FFFFFF',
      projection: 'mercator',
      backgroundAlpha: 1,
      backgroundColor: 'rgba(80,80,80,1)',

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
        color: 'rgba(129,129,129,1)',
        outlineColor: 'rgba(80,80,80,1)',
        rollOverOutlineColor: 'rgba(80,80,80,1)',
        rollOverBrightness: 20,
        selectedBrightness: 20,
        autoZoom: false,
        selectedColor: '#CC0000'
      }


    });
  }
}
