import { TestBed } from '@angular/core/testing';

import { TeklifdetayService } from './teklifdetay.service';

describe('TeklifdetayService', () => {
  let service: TeklifdetayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeklifdetayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
