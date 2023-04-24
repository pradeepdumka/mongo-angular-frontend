import { TestBed } from '@angular/core/testing';

import { RuntimeEnvironmentsService } from './runtime-environments.service';

describe('RuntimeEnvironmentsService', () => {
  let service: RuntimeEnvironmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuntimeEnvironmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
