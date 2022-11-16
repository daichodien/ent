import { TestBed, inject } from '@angular/core/testing';

import { MenuNavbarService } from './menu-navbar.service';

describe('MenuNavbarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuNavbarService]
    });
  });

  it('should be created', inject([MenuNavbarService], (service: MenuNavbarService) => {
    expect(service).toBeTruthy();
  }));
});
