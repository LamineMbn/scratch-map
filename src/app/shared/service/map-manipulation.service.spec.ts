import { TestBed, inject } from '@angular/core/testing';

import { MapManipulationService } from './map-manipulation.service';

describe('MapManipulationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapManipulationService]
    });
  });

  it('should be created', inject([MapManipulationService], (service: MapManipulationService) => {
    expect(service).toBeTruthy();
  }));
});
