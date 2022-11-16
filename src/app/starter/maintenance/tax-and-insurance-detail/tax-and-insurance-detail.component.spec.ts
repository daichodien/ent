import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxAndInsuranceDetailComponent } from './tax-and-insurance-detail.component';

describe('TaxAndInsuranceDetailComponent', () => {
  let component: TaxAndInsuranceDetailComponent;
  let fixture: ComponentFixture<TaxAndInsuranceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxAndInsuranceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxAndInsuranceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
