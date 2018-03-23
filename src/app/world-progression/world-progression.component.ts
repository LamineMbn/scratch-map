import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-world-progression',
  templateUrl: './world-progression.component.html',
  styleUrls: ['./world-progression.component.scss']
})
export class WorldProgressionComponent implements OnChanges {

  readonly COUNTRY_TOTAL_NUMBER = 197;

  @Input() numberCountryVisited: number;

  progression$: Observable<any>;

  value = 2;

  constructor() {
  }

  ngOnChanges() {
    this.progression$ = Observable.interval(50).take(this.calculateWorldCover() + 1);
    this.value = this.calculateWorldCover();
  }

  calculateWorldCover() {
    return Math.ceil(this.numberCountryVisited * 100 / this.COUNTRY_TOTAL_NUMBER);
  }

}
