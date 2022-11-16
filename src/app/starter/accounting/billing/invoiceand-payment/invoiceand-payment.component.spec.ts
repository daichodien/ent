import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceandPaymentComponent } from './invoiceand-payment.component';

describe('InvoiceandPaymentComponent', () => {
  let component: InvoiceandPaymentComponent;
  let fixture: ComponentFixture<InvoiceandPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceandPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceandPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
