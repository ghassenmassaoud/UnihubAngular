import { TestBed } from '@angular/core/testing';

import { RecommService } from './recomm.service';

describe('RecommService', () => {
  let service: RecommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
