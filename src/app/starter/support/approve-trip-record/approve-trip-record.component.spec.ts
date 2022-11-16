import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTripRecordComponent } from './approve-trip-record.component';

describe('ApproveTripRecordComponent', () => {
  let component: ApproveTripRecordComponent;
  let fixture: ComponentFixture<ApproveTripRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveTripRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveTripRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
