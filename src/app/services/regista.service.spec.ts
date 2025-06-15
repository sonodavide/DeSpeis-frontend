import { TestBed } from '@angular/core/testing';

import { RegistaService } from './regista.service';

describe('RegistaService', () => {
  let service: RegistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
