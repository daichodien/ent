import { TestBed, inject } from '@angular/core/testing';

import { TaxAndInsuranceService } from './tax-and-insurance.service';

describe('TaxAndInsuranceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaxAndInsuranceService]
    });
  });

  it('should be created', inject([TaxAndInsuranceService], (service: TaxAndInsuranceService) => {
    expect(service).toBeTruthy();
  }));
});
