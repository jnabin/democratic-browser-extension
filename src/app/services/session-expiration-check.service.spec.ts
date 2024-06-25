import { TestBed } from '@angular/core/testing';

import { SessionExpirationCheckService } from './session-expiration-check.service';

describe('SessionExpirationCheckService', () => {
  let service: SessionExpirationCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionExpirationCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
