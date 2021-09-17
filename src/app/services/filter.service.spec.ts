import { TestBed } from '@angular/core/testing';

import { FiltersListService } from './filters-list.service';

describe('FilterService', () => {
  let service: FiltersListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltersListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
