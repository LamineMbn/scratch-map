import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldProgressionComponent } from './world-progression.component';

describe('WorldProgressionComponent', () => {
  let component: WorldProgressionComponent;
  let fixture: ComponentFixture<WorldProgressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldProgressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldProgressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
