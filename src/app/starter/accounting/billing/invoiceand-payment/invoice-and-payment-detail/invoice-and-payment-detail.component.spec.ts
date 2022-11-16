import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAndPaymentDetailComponent } from './invoice-and-payment-detail.component';

describe('InvoiceAndPaymentDetailComponent', () => {
  let component: InvoiceAndPaymentDetailComponent;
  let fixture: ComponentFixture<InvoiceAndPaymentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceAndPaymentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceAndPaymentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
