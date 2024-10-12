import { TestBed } from '@angular/core/testing';

import { AttoreService } from './attore.service';

describe('AttoreService', () => {
  let service: AttoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
