import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateInputComponent } from './template-input.component';

describe('TemplateInputComponent', () => {
  let component: TemplateInputComponent;
  let fixture: ComponentFixture<TemplateInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
