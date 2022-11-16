import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalFeeComponent } from './approval-fee.component';

describe('ApprovalFeeComponent', () => {
  let component: ApprovalFeeComponent;
  let fixture: ComponentFixture<ApprovalFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
