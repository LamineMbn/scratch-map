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
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardService } from './login/login-guard.service';
import { AuthenticationService } from './shared/service/authentication.service';
import { AngularFireAuth } from 'angularfire2/auth';
import {AvatarModule} from 'ngx-avatar';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {DatabaseService} from './shared/service/database.service';

export const ROUTES: Routes = [
  {path: '', redirectTo: 'travel-map', pathMatch: 'full'},
  {
    path: 'travel-map',
    canActivate: [LoginGuardService],
    children: [
      {path: '', component: TravelMapComponent}
    ]
  },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TravelMapComponent,
    CountrySelectComponent,
    ProjectionSelectComponent,
    WorldProgressionComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(ROUTES, {useHash: true, enableTracing: true}),
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AmChartsModule,
    AvatarModule,
    AngularFirestoreModule
  ],
  providers: [AngularFireAuth, LoginGuardService, AuthenticationService, DatabaseService, CountriesApiService, MapManipulationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
