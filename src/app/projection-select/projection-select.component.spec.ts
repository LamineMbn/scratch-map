import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionSelectComponent } from './projection-select.component';

describe('ProjectionSelectComponent', () => {
  let component: ProjectionSelectComponent;
  let fixture: ComponentFixture<ProjectionSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectionSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
