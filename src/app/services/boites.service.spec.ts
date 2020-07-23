import { TestBed } from '@angular/core/testing';

import { BoitesService } from './boites.service';

describe('BoitesService', () => {
  let service: BoitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
