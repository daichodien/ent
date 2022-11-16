import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpArticleDetailComponent } from './wp-article-detail.component';

describe('WpArticleDetailComponent', () => {
  let component: WpArticleDetailComponent;
  let fixture: ComponentFixture<WpArticleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpArticleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
