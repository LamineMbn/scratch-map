import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-projection-select',
  templateUrl: './projection-select.component.html',
  styleUrls: ['./projection-select.component.scss']
})
export class ProjectionSelectComponent implements OnInit {

  @Output() projection: EventEmitter<any>;

  projections = [
    {value: 'miller', viewValue: '--'},
    {value: 'miller', viewValue: 'Miller (default)'},
    {value: 'mercator', viewValue: 'Mercator'},
    {value: 'equirectangular', viewValue: 'Equirectangular'},
    {value: 'eckert3', viewValue: 'Eckert 3'},
    {value: 'eckert5', viewValue: 'Eckert 5'},
    {value: 'eckert6', viewValue: 'Eckert 6'},
    {value: 'winkel3', viewValue: 'Winkel 3'}
  ];

  constructor() {
    this.projection = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  changeProjection(event: MatSelectChange) {
    this.projection.emit(event.value);
  }

}
