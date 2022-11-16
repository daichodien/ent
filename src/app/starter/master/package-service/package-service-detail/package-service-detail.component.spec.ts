import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageServiceDetailComponent } from './package-service-detail.component';

describe('PackageServiceDetailComponent', () => {
  let component: PackageServiceDetailComponent;
  let fixture: ComponentFixture<PackageServiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageServiceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
