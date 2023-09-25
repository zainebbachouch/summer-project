import { TestBed } from '@angular/core/testing';

import { ApplyonofferService } from './applyonoffer.service';

describe('ApplyonofferService', () => {
  let service: ApplyonofferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplyonofferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
