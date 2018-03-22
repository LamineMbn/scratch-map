import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatSelectModule } from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatSelectModule
  ],
  declarations: []
})
export class AngularMaterialModule {
}
