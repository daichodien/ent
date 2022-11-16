import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageServiceComponent } from './package-service.component';

describe('PackageServiceComponent', () => {
  let component: PackageServiceComponent;
  let fixture: ComponentFixture<PackageServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
