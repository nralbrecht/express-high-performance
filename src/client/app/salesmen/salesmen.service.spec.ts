import { TestBed } from '@angular/core/testing';

import { SalesmenService } from './salesmen.service';

describe('SalesmenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesmenService = TestBed.get(SalesmenService);
    expect(service).toBeTruthy();
  });
});
