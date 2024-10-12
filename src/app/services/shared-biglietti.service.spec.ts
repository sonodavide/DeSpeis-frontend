import { TestBed } from '@angular/core/testing';

import { SharedBigliettiService } from './shared-biglietti.service';

describe('SharedBigliettiService', () => {
  let service: SharedBigliettiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedBigliettiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
