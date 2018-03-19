import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { TravelMapComponent } from './travel-map/travel-map.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CountriesApiService } from './service/countries-api.service';

@NgModule({
  declarations: [
    AppComponent,
    TravelMapComponent
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
  providers: [CountriesApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
