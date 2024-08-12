import { TestBed } from '@angular/core/testing';

import { UtilityService } from './utility.service';

xdescribe('UtilityService', () => {
  let service: UtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilityService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
