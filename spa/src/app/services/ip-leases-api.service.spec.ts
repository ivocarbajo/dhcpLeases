import { TestBed } from '@angular/core/testing';

import { IpLeasesApiService } from './ip-leases-api.service';

describe('IpLeasesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpLeasesApiService = TestBed.get(IpLeasesApiService);
    expect(service).toBeTruthy();
  });
});
