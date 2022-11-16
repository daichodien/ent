import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInspectionComponent } from './check-inspection.component';

describe('CheckInspectionComponent', () => {
  let component: CheckInspectionComponent;
  let fixture: ComponentFixture<CheckInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
