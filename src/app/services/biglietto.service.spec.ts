import { TestBed } from '@angular/core/testing';

import { BigliettoService } from './biglietto.service';

describe('BigliettoService', () => {
  let service: BigliettoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BigliettoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
