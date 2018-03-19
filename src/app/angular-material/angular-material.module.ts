import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatProgressBarModule } from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatProgressBarModule
  ],
  declarations: []
})
export class AngularMaterialModule {
}
