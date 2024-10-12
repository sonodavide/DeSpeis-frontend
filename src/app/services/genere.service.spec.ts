import { TestBed } from '@angular/core/testing';

import { GenereService } from './genere.service';

describe('GenereService', () => {
  let service: GenereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
