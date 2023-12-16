import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ensureLoggedInGuard } from './ensure-logged-in.guard';

describe('ensureLoggedInGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => ensureLoggedInGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
