import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardCodeComponent } from './standard-code.component';

describe('StandardCodeComponent', () => {
  let component: StandardCodeComponent;
  let fixture: ComponentFixture<StandardCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
