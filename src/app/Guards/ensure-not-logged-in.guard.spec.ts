import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ensureNotLoggedInGuard } from './ensure-not-logged-in.guard';

describe('ensureNotLoggedInGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => ensureNotLoggedInGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
