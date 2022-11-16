import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetModelComponent } from './fleet-model.component';

describe('FleetModelComponent', () => {
  let component: FleetModelComponent;
  let fixture: ComponentFixture<FleetModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
