import { TestBed } from '@angular/core/testing';

import { NumeriUtiliService } from './numeri-utili.service';

describe('NumeriUtiliService', () => {
  let service: NumeriUtiliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumeriUtiliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
