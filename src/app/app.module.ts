import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { TravelMapComponent } from './travel-map/travel-map.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CountriesApiService } from './shared/service/countries-api.service';
import { CountrySelectComponent } from './country-select/country-select.component';
import { MapManipulationService } from './shared/service/map-manipulation.service';
import { ProjectionSelectComponent } from './projection-select/projection-select.component';
import { WorldProgressionComponent } from './world-progression/world-progression.component';

@NgModule({
  declarations: [
    AppComponent,
    TravelMapComponent,
    CountrySelectComponent,
    ProjectionSelectComponent,
    WorldProgressionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AmChartsModule
  ],
  providers: [CountriesApiService, MapManipulationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
