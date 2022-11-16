import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTicketDetailComponent } from './customer-ticket-detail.component';

describe('FleetIncidentDetailComponent', () => {
  let component: CustomerTicketDetailComponent;
  let fixture: ComponentFixture<CustomerTicketDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTicketDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
