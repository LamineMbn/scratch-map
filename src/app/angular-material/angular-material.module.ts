import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatSelectModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule
  ],
  declarations: []
})
export class AngularMaterialModule {
}
